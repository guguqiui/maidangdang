import Mock from "mockjs";
const Random = Mock.Random
 
const queryGoods = (data) => {
	return {
    "code": 0,
    "message": "菜品获取成功",
    "data": {
        "dishes": [
            {
                "DishId": 1,
                "Name": "薯条",
                "Description": "",
                "Price": 13.5,
                "CategoryID": 1,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:57:31.456Z",
                "UpdatedAt": "2024-04-25T15:57:31.456Z",
                "DeletedAt": null
            },
            {
                "DishId": 2,
                "Name": "脆脆薯条",
                "Description": "",
                "Price": 15.5,
                "CategoryID": 1,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:08:37.001Z",
                "UpdatedAt": "2024-04-25T16:08:37.001Z",
                "DeletedAt": null
            },
            {
                "DishId": 3,
                "Name": "玉米杯",
                "Description": "",
                "Price": 12.5,
                "CategoryID": 1,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:08:59.294Z",
                "UpdatedAt": "2024-04-25T16:08:59.294Z",
                "DeletedAt": null
            },
            {
                "DishId": 4,
                "Name": "苹果片",
                "Description": "",
                "Price": 6.5,
                "CategoryID": 1,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:09:15.516Z",
                "UpdatedAt": "2024-04-25T16:09:15.516Z",
                "DeletedAt": null
            },
            {
                "DishId": 5,
                "Name": "奥利奥麦旋风",
                "Description": "",
                "Price": 14.5,
                "CategoryID": 3,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:09:50.382Z",
                "UpdatedAt": "2024-04-25T16:09:50.382Z",
                "DeletedAt": null
            },
            {
                "DishId": 6,
                "Name": "草莓麦旋风",
                "Description": "",
                "Price": 14.5,
                "CategoryID": 3,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:10:01.3Z",
                "UpdatedAt": "2024-04-25T16:10:01.3Z",
                "DeletedAt": null
            },
            {
                "DishId": 7,
                "Name": "草莓新地",
                "Description": "",
                "Price": 12,
                "CategoryID": 3,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:10:12.918Z",
                "UpdatedAt": "2024-04-25T16:10:12.918Z",
                "DeletedAt": null
            },
            {
                "DishId": 8,
                "Name": "朱古力新地",
                "Description": "",
                "Price": 12,
                "CategoryID": 3,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:10:20.324Z",
                "UpdatedAt": "2024-04-25T16:10:20.324Z",
                "DeletedAt": null
            },
            {
                "DishId": 9,
                "Name": "圆筒冰淇凌",
                "Description": "",
                "Price": 5,
                "CategoryID": 3,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:10:52.909Z",
                "UpdatedAt": "2024-04-25T16:10:52.909Z",
                "DeletedAt": null
            },
            {
                "DishId": 10,
                "Name": "那么大鸡排(辣)",
                "Description": "",
                "Price": 13,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:11:27.279Z",
                "UpdatedAt": "2024-04-25T16:11:27.279Z",
                "DeletedAt": null
            },
            {
                "DishId": 11,
                "Name": "麦麦脆汁鸡2块",
                "Description": "",
                "Price": 26,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:12:20.807Z",
                "UpdatedAt": "2024-04-25T16:12:20.807Z",
                "DeletedAt": null
            },
            {
                "DishId": 12,
                "Name": "麦麦脆汁鸡1块",
                "Description": "",
                "Price": 14,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:12:29.925Z",
                "UpdatedAt": "2024-04-25T16:12:29.925Z",
                "DeletedAt": null
            },
            {
                "DishId": 13,
                "Name": "麦乐鸡",
                "Description": "",
                "Price": 14,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:12:40.528Z",
                "UpdatedAt": "2024-04-25T16:12:40.528Z",
                "DeletedAt": null
            },
            {
                "DishId": 14,
                "Name": "麦辣鸡翅",
                "Description": "",
                "Price": 14,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:12:54.704Z",
                "UpdatedAt": "2024-04-25T16:12:54.704Z",
                "DeletedAt": null
            },
            {
                "DishId": 15,
                "Name": "麦麦趣鸡球",
                "Description": "",
                "Price": 13,
                "CategoryID": 5,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:13:10.18Z",
                "UpdatedAt": "2024-04-25T16:13:10.18Z",
                "DeletedAt": null
            },
            {
                "DishId": 16,
                "Name": "汉堡包",
                "Description": "",
                "Price": 13,
                "CategoryID": 2,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:13:24.985Z",
                "UpdatedAt": "2024-04-25T16:13:24.985Z",
                "DeletedAt": null
            },
            {
                "DishId": 17,
                "Name": "吉士汉堡包",
                "Description": "",
                "Price": 14,
                "CategoryID": 2,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:13:59.148Z",
                "UpdatedAt": "2024-04-25T16:13:59.148Z",
                "DeletedAt": null
            },
            {
                "DishId": 18,
                "Name": "双层吉士汉堡",
                "Description": "",
                "Price": 22,
                "CategoryID": 2,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:14:16.012Z",
                "UpdatedAt": "2024-04-25T16:14:16.012Z",
                "DeletedAt": null
            },
            {
                "DishId": 19,
                "Name": "培根蔬萃双层牛堡",
                "Description": "",
                "Price": 23.5,
                "CategoryID": 2,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:14:50.528Z",
                "UpdatedAt": "2024-04-25T16:14:50.528Z",
                "DeletedAt": null
            },
            {
                "DishId": 20,
                "Name": "不素之霸双层牛堡",
                "Description": "",
                "Price": 25.5,
                "CategoryID": 2,
                "IsPopular": false,
                "ID": 0,
                "CreatedAt": "2024-04-25T16:15:15.329Z",
                "UpdatedAt": "2024-04-25T16:15:15.329Z",
                "DeletedAt": null
            }
        ]
    }
}
}
 
Mock.mock('http://82.156.104.168:80/api/dish/list', 'get', queryGoods())

const queryCategories = (data) => {
	return {
    "code": 0,
    "message": "分类获取成功",
    "data": {
        "categories": [
            {
                "CategoryID": 1,
                "Category": "小食",
                "ParentID": null,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:19:11.824Z",
                "UpdatedAt": "2024-04-25T15:19:11.824Z",
                "DeletedAt": null
            },
            {
                "CategoryID": 2,
                "Category": "汉堡",
                "ParentID": null,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:19:24.786Z",
                "UpdatedAt": "2024-04-25T15:19:24.786Z",
                "DeletedAt": null
            },
            {
                "CategoryID": 3,
                "Category": "甜品",
                "ParentID": null,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:19:34.214Z",
                "UpdatedAt": "2024-04-25T15:19:34.214Z",
                "DeletedAt": null
            },
            {
                "CategoryID": 4,
                "Category": "饮品",
                "ParentID": null,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:20:47.134Z",
                "UpdatedAt": "2024-04-25T15:20:47.134Z",
                "DeletedAt": null
            },
            {
                "CategoryID": 5,
                "Category": "炸鸡",
                "ParentID": null,
                "ID": 0,
                "CreatedAt": "2024-04-25T15:50:10.058Z",
                "UpdatedAt": "2024-04-25T15:50:10.058Z",
                "DeletedAt": null
            }
		]
	}
}
}

Mock.mock('http://82.156.104.168:80/api/category/list', 'get', queryCategories())

const dishesData = {
  1: [
    {
      DishId: 1,
      Name: "薯条",
      Description: "",
      Price: 13.5,
      CategoryID: 1,
      IsPopular: false,
      ID: 0,
      CreatedAt: "2024-04-25T15:57:31.456Z",
      UpdatedAt: "2024-04-25T15:57:31.456Z",
      DeletedAt: null
    },
    {
      DishId: 2,
      Name: "脆脆薯条",
      Description: "",
      Price: 15.5,
      CategoryID: 1,
      IsPopular: false,
      ID: 0,
      CreatedAt: "2024-04-25T16:08:37.001Z",
      UpdatedAt: "2024-04-25T16:08:37.001Z",
      DeletedAt: null
    }
  ],
  2: [
    {
      DishId: 3,
      Name: "汉堡",
      Description: "",
      Price: 25.5,
      CategoryID: 2,
      IsPopular: false,
      ID: 0,
      CreatedAt: "2024-04-25T17:08:37.001Z",
      UpdatedAt: "2024-04-25T17:08:37.001Z",
      DeletedAt: null
    }
  ],
  // 其他分类的数据可以按相同方式添加
}

Mock.mock('http://82.156.104.168:80/api/dish/category', 'post', (options) => {
  const { category_id } = JSON.parse(options.body);

  const dishes = dishesData[category_id] || [];
  
  return {
    code: 0,
    message: "菜品获取成功",
    data: {
      dishes
    }
  };
});