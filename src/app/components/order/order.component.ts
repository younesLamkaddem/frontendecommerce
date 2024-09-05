import { Component ,Input,OnInit} from '@angular/core';
import { OrderServiceService } from '../../services/order-service.service';
import { Order } from '../../models/Order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  constructor(private orderServiceService : OrderServiceService ,private route : ActivatedRoute) { }
  orders: Order[] = [];
  order: Order = { id :0, customerName :"",totalAmount:0,shippingAddress:"",orderDate:new Date,items: []};
  orderReceived = false; 

  username: string | null = null;
  showOrderListComponent = false;
  showOrderForm =true;
  ngOnInit(): void {

      this.route.queryParamMap.subscribe(params => {
        this.username = params.get('username');
        console.log('Username from query parameter:', this.username);
        if (this.username) {
       this.orderServiceService.getOrdersByUsername(this.username).subscribe(data => {
        this.orders = data;
      });
        }
      });
  }

  passOrder(orderForm: any) {

    this.orderServiceService.passOrder(orderForm,this.username);
    this.orderReceived = true; 
    setTimeout(() => {
      this.orderReceived = false;
    }, 3000);
    this.showOrderListComponent=true;
    this.showOrderForm=false;
    this.ngOnInit()
  }  
  GetUserOrderList(username:any){
    this.orderServiceService.getOrdersByUsername(username).subscribe(
      orders => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );    
  }
}
