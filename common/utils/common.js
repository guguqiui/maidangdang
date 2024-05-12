export function getStatusName(status) {
	var name = ""
	switch (status) {
	  case 1:
	    name = "待付款";
	    break;
	  case 2:
	    name = "待发货";
	    break;
	  case 3:
	    name = "待收货";
	    break;
	  case 4:
	    name = "待评价";
	    break;
	  case 5:
	    name = "退货中";
	    break;
	  default:
	    name = "已完成"
	}
	return name
}
