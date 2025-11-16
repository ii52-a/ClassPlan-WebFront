<template>
  <div class="datelist"><el-calendar v-model="calendarDate" el-calendar-cell-width="65px">
      <template #date-cell="{ data }" >
        <div class="in_click" @click="click_detail()">
          <div :class="data.isSelected ? 'is-selected' : ''" class="calendar_font"  >
            {{ data.day.split("-").slice(1).join("-") }}
            <el-tag type="danger" v-if="e(data)" class="a" size="small">待完成</el-tag>
            <el-tag type="success" v-if="!e(data)" class="a" size="small">无任务</el-tag>
          </div>
          <div class="event" v-if="e(data)">
          <el-row >
            <el-row :span="1"></el-row>
            <el-col :span="7"><el-tag type="success" v-if="e(data)" class="a" size="small">马原</el-tag></el-col>
            <el-row :span="1"></el-row>
            <el-col :span="7"><el-tag type="warning" v-if="e(data)" class="a" size="small">大物</el-tag></el-col>
            <el-row :span="1"></el-row>
            <el-col :span="7"><el-tag type="warning" v-if="e(data)" class="a" size="small">高数</el-tag></el-col>
            <el-row :span="1"></el-row>
          </el-row>
          </div>
        </div>
          
      </template>
    </el-calendar></div>
    <event_detail v-model="if_detail"></event_detail>
    

</template>
<script setup>
// 日历
import { ref } from 'vue'
import event_detail from '@/components/event_detail.vue';
const calendarDate = ref(new Date());
const calendarData = ref({});

const if_detail=ref(false)
const click_detail=()=>{
  if_detail.value=true;
  console.log(if_detail.value);
  
}

const e = (getdate) => {
  const dates = getdate.date
  // console.log(dates);

  const date = new Date(2025, 9, 12);
  if (date.getFullYear() == dates.getFullYear() &&
    date.getMonth() == dates.getMonth() &&
    date.getDate() == dates.getDate()
  ) {
    return true
  }
}
</script>
<style scoped>
:deep(.el-calendar) {
  --el-calendar-cell-width: 105px; 
}
.calendar_font{
  font-size: 18px;
  margin-bottom: 10px;
}
.a{
  
  margin-left: 16%;
}
.card{
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}
.datelist {
  width: 100%;
}

.event {
  color: red;

}
.in_click{
  width: 100%;
  height: 100%;
}
</style>
