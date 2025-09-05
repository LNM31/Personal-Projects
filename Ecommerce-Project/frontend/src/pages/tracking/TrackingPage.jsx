import { Link } from "react-router";
import { Header } from "../../components/Header.jsx";
import './TrackingPage.css'
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) 
{
  const [orderData, setOrderData] = useState(null);
  const {orderId, productId} = useParams();
  
  useEffect(() => 
  {
    const fetchTrackingData = async () => 
    {
      const response = await axios(`/api/orders/${orderId}?expand=products`);
      setOrderData(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if(orderData === null) return null;

  const productData = orderData.products.find(productItem => 
  {
    return productId === productItem.product.id;
  });

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(productData.estimatedDeliveryTimeMs).format('dddd, MMMM d')}
          </div>

          <div className="product-info">
            {productData.product.name}
          </div>

          <div className="product-info">
            Quantity: {productData.quantity}
          </div>

          <img className="product-image" src={productData.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}