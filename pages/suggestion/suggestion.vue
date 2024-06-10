<template>
    <view class="page-wrapper">
        <view class="form-container">
            <view class="form-item">
                <textarea v-model="suggestion" placeholder="请输入您的意见和建议" class="textarea"></textarea>
            </view>
            <button class="submit-btn" @tap="submitSuggestion">提交</button>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const suggestion = ref(''); // 响应式变量，用于存储用户输入的建议

const submitSuggestion = () => {
    if (suggestion.value.trim() === '') {
        uni.showToast({
            title: '请输入意见和建议',
            icon: 'none',
            duration: 2000
        });
        return;
    }

    // 模拟提交成功
    uni.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
    });
    suggestion.value = ''; // 清空输入框
};
</script>

<style>
.page-wrapper {
    padding: 10rpx; /* 减少内边距 */
    background-color: #f4f4f4;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 向上对齐 */
}

.form-container {
    width: 100%; /* 增加宽度 */
    padding: 10rpx; /* 减少内边距 */
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    margin-top: 20rpx; /* 减少顶部间距 */
}

.form-item {
    margin-bottom: 20rpx;
}

.textarea {
    width: 100%;
    height: 300rpx; /* 增加高度 */
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    padding: 10rpx;
    font-size: 28rpx;
    resize: none;
}
.submit-btn {
    font-size: 35rpx; /* 调小字体大小 */
    color: #fff;
    background-color: #ED9220;
    border-radius: 2rem; /* 调小圆角半径 */
    padding: 10rpx; /* 减少内边距 */
    text-align: center;
    margin: 10rpx 0; /* 调整外边距 */
    width: auto; /* 自适应宽度 */
}
</style>


