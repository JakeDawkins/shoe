const { RESTDataSource } = require('apollo-datasource-rest');

const orderReducer = (rawOrder) => ({
  id: rawOrder.id,
  description: rawOrder.fields.ShoeDescription,
  customerNotes: rawOrder.fields.CustomerNotes,
  finished: rawOrder.fields.Status === 'Closed',
  dateFinished: rawOrder.fields.DateFinished,
  estimatedFinish: rawOrder.fields.EstimatedFinish,
  status: rawOrder.fields.Status,
  photoBefore: rawOrder.fields.PhotoBefore && rawOrder.fields.PhotoBefore.length ? rawOrder.fields.PhotoBefore[0].url : null,
  photoAfter: rawOrder.fields.PhotoAfter && rawOrder.fields.PhotoAfter.length ? rawOrder.fields.PhotoAfter[0].url : null,
  notes: rawOrder.fields.Notes,
  customerEmail: rawOrder.fields.CustomerEmail,
});

class OrdersAPI extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = 'https://api.airtable.com/v0/app86TLlqdH3pJbkq/All/';
  }
  
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${process.env.AIRTABLE_API_KEY}`);
  }

  async getAllOrders() {
    const res = await this.get('');
    return res && res.records && res.records.length ? res.records.map(orderReducer) : [];
  }

  async getOrderById(id) {
    const res = await this.get(id);
    return res ? orderReducer(res) : null;
  }

  async getQueuePosition(id) {
    const orders = await this.getAllOrders();
    let count = 0;
    orders.some(o => {
      if (o.id === id) return true;
      if(o.status === 'Received' || o.status === 'Cleaning'){
        count = count + 1;
      }
    });
    
    return count;
  }
}

module.exports = OrdersAPI;