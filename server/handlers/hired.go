package handlers

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
	hireddto "waysgallery/dto/hired"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type handlerHired struct {
	HiredRepository repositories.HiredRepository
}

func HandlerHired(HiredRepository repositories.HiredRepository) *handlerHired {
	return &handlerHired{HiredRepository}
}

func (h *handlerHired) CreateHired(c echo.Context) error {
	request := new(hireddto.CreateHiredRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request.Status = "pending"
	price, _ := strconv.Atoi(request.Price)
	orderTo, _ := strconv.Atoi(request.OrderTo)
	startProject, _ := time.Parse("2006-01-02", request.StartProject)
	endProject, _ := time.Parse("2006-01-02", request.EndProject)

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	hired := models.Hired{
		Title: request.Title,
		Description: request.Description,
		StartProject: startProject,
		EndProject: endProject,
		Price: price,
		OrderBy: int(userId),
		OrderTo: orderTo,
		Status: request.Status,
	}

	dataTransaction, err := h.HiredRepository.CreateHired(hired)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(int(hired.ID)),
			GrossAmt: int64(dataTransaction.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransaction.UserOrderBy.Fullname,
			Email: dataTransaction.UserOrderBy.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: snapResp})
}

func (h *handlerHired) FindOffer(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	offer, err := h.HiredRepository.FindOffer(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, hireddto.HiredResponse{Hired: offer})
}

func (h *handlerHired) FindOrder(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	order, err := h.HiredRepository.FindOrder(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, hireddto.HiredResponse{Hired: order})
}

func (h *handlerHired) Notification(c echo.Context) error {
  var notificationPayload map[string]interface{}

  if err := c.Bind(&notificationPayload); err != nil {
    return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  }

  transactionStatus := notificationPayload["transaction_status"].(string)
  fraudStatus := notificationPayload["fraud_status"].(string)
  orderBy := notificationPayload["order_id"].(string)

  order_by, _ := strconv.Atoi(orderBy)

  fmt.Print("ini payloadnya", notificationPayload)

  if transactionStatus == "capture" {
    if fraudStatus == "challenge" {
      // TODO set transaction status on your database to 'challenge'
      // e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
      h.HiredRepository.UpdateHired("pending", order_by)
    } else if fraudStatus == "accept" {
      // TODO set transaction status on your database to 'success'
      h.HiredRepository.UpdateHired("success", order_by)
    }
  } else if transactionStatus == "settlement" {
    // TODO set transaction status on your databaase to 'success'
    h.HiredRepository.UpdateHired("success", order_by)
  } else if transactionStatus == "deny" {
    // TODO you can ignore 'deny', because most of the time it allows payment retries
    // and later can become success
		h.HiredRepository.UpdateHired("failed", order_by)
  } else if transactionStatus == "cancel" || transactionStatus == "expire" {
    // TODO set transaction status on your databaase to 'failure'
    h.HiredRepository.UpdateHired("failed", order_by)
  } else if transactionStatus == "pending" {
    // TODO set transaction status on your databaase to 'pending' / waiting payment
    h.HiredRepository.UpdateHired("pending", order_by)
  }

  return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: notificationPayload})
}