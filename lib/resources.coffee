class Base
  constructor: (@pps_client) ->
  getAll     : (params, callback) ->
    @pps_client.getResource @resourceName, (error, data, response) ->
      callback(error, data, response)


class Pci extends Base
  resourceName: 'Pci'


class CardType extends Base
  resourceName: 'CardType'


class Account extends Base
class AutoClose extends Base
class Campaign extends Base
class CardType extends Base
class Coupon extends Base
class Customer extends Base
class Device extends Base
class Discount extends Base
class Geocode extends Base
class InvoiceImport extends Base
class Notification extends Base
class NotificationCategory extends Base
  resourceName: 'NotificationCategory'

class NotificationOptionAction extends Base
class Order extends Base
class SAQ extends Base
class Payment extends Base


module.exports = {
Base
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


