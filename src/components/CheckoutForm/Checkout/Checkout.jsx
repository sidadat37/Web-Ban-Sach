import React, { useState, useEffect } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'

const steps = ['Địa chỉ giao hàng', 'Chi tiết thanh toán']

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()
  const navigate = useNavigate() // Sử dụng useNavigate thay vì useHistory

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
          setCheckoutToken(token)
        } catch {
          if (activeStep !== steps.length) navigate('/')
        }
      }

      generateToken()
    }
  }, [cart, activeStep, navigate]) // Đảm bảo bao gồm các phụ thuộc

  const test = (data) => {
    setShippingData(data)
    nextStep()
  }

  let Confirmation = () => (
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">Cảm ơn bạn đã mua hàng, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Mã đơn hàng: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Quay lại trang chủ</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )
  )

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Lỗi: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Quay lại trang chủ</Button>
      </>
    )
  }

  const Form = () => (
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    )
  )

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Thanh toán</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
