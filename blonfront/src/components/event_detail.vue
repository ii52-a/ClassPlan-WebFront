<template>
  <PLmain>
    <el-dialog v-model="model" title="事件详情" width="800">
      <el-table :data="props.gridData">
        <el-table-column property="date" label="日期" width="150" />
        <el-table-column property="event" label="事件" width="200" />
        <el-table-column label="状态">
          <template #default="scope">
              <el-tag v-if="scope.row.status==='success'" type="success">已完成</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </PLmain>
</template>

<script setup>
import PLmain from './PLmain.vue';
import { defineProps, defineModel } from 'vue';

const model = defineModel({ required: true });

const props = defineProps({
  gridData: {
    type: Array,
    default: () => [
      {
        date: "2025-10-15",
        event: "高数",
        status: "success"
      }
    ]
  }
});
</script>

<style scoped>
.el-icon {
  vertical-align: middle;
}
</style>