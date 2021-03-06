# base resource object - encapsulates networking client
# and implements http calls..
class Base
  constructor: (@pps_client) ->
  getAll     : (params, callback) ->
    @pps_client.getResource @resource_name, params, callback
  getById    : (id, callback) ->
    @pps_client.getResourceById @resource_name, id, callback
  get    : (id, params, callback) ->
    @pps_client.getResourceById @resource_name + '/' + id, params, callback
  post       : (obj, callback) ->
    @pps_client.postResource @resource_name, obj, callback
  put        : (obj, callback) ->
    @pps_client.putResource @resource_name, obj, callback
  delete        : (id, callback) ->
    @pps_client.deleteResource @resource_name, id, callback

# Api data objects
class Pci extends Base
  resource_name: 'Pci'

class CardType extends Base
  resource_name: 'CardType'

class Account extends Base
  resource_name: 'Account'

class AutoClose extends Base
  resource_name: 'AutoClose'

class Campaign extends Base
  resource_name: 'Campaign'

class CardType extends Base
  resource_name: 'CardType'

class Coupon extends Base
  resource_name: 'Coupon'

class Customer extends Base
  resource_name: 'Customer'

class Device extends Base
  resource_name: 'Device'

class Discount extends Base
  resource_name: 'Discount'

class Geocode extends Base
  resource_name: 'Geocode'

class InvoiceImport extends Base
  resource_name: 'InvoiceImport'
  getAll: (merchantId, callback) ->
    merchId = merchantId
    @pps_client.getUrl @resource_name + "?merchantId=" + merchId, callback

class Notification extends Base
  resource_name: 'Notification'

class NotificationCategory extends Base
  resource_name: 'NotificationCategory'

class NotificationOptionAction extends Base
  resource_name: 'NotificationOptionAction'

class Order extends Base
  resource_name: 'Order'

class SAQ extends Base
  resource_name: 'SAQ'

class Payment extends Base
  resource_name: 'Payment'
  post: (payment, callback) ->
    merchId = payment.merchantId
    @pps_client.postResource @resource_name + "?merchantId=" + merchId, JSON.stringify(payment), callback


module.exports = {
Pci
Account
AutoClose
Campaign
CardType
Coupon
Customer
Device
Discount
Geocode
InvoiceImport
Notification
NotificationCategory
NotificationOptionAction
Order
SAQ
Payment
}


