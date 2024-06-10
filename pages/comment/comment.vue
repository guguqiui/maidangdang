<template>
    <view class="page-wrapper">
        <view class="comment-container">
            <textarea class="comment-input" placeholder="请输入评价内容" v-model="comment"></textarea>
        </view>
        <button class="submit-button" @tap="submitComment">提交评价</button>
    </view>
</template>



<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { commentOrder } from '@/common/api';

const id = ref('');
const comment = ref('');

onLoad((e) => {
    id.value = e.order_id;
    console.log('Order ID:', id.value);
});

const submitComment = async () => {
    if (!comment.value) {
        uni.showToast({
            title: '请输入评价内容',
            icon: 'none',
            duration: 2000
        });
        return;
    }

    const params = {
        order_id: parseInt(id.value),
        comment: comment.value
    };

    try {
        const response = await commentOrder(params);
		console.log(response)
        if (response.data.code === 0) {
            uni.showToast({
                title: '评价提交成功',
                icon: 'success',
                duration: 2000
            });
            // 跳转回订单页面或其他逻辑
            uni.navigateBack();
        } else {
            uni.showToast({
                title: '评价提交失败',
                icon: 'none',
                duration: 2000
            });
        }
    } catch (error) {
        console.error('Failed to submit comment:', error);
        uni.showToast({
            title: '评价提交失败',
            icon: 'none',
            duration: 2000
        });
    }
};
</script>


<style>
.page-wrapper {
    margin: 0;
    padding: 20rpx;
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.comment-container {
    width: 100%;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.comment-input {
    width: 100%;
    height: 300rpx; /* 增加高度 */
    font-size: 28rpx;
    padding: 20rpx; /* 增加内边距 */
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    box-sizing: border-box;
}

.submit-button {
    width: 100%;
    font-size: 35rpx;
    padding: 10rpx;
    border: none;
    border-radius: 50rpx; /* 圆角 */
    background-color: #ED9220;
    color: #fff;
    text-align: center;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-top: 20rpx; /* 增加顶部间距 */
}

.submit-button:active {
    background-color: #d18b1e;
}
</style>



