<template>
  <secondary-menu :offsetHeight="50" :leftWidth="400"  :minLeftWidth="300" :rightTitle="false">
    <div slot="left-title">
      <label>组织机构树</label>
      <DimensionIndex @dimensionChanged="dimensionChanged"></DimensionIndex>
    </div>
    <div slot="left-body">
      <OrgTree @removeListener="removeListener" ref="orgTree" :dimension="dimension"
               @chooseNode="chooseObj"></OrgTree>
    </div>
    <div slot="right-body">
      <el-tabs class="ml-5" type="card" v-if="currentObj">
        <el-tab-pane>
          <span slot="label"><svg-icon iconClass="details"></svg-icon> 概要</span>
          <component :is="`${currentObj.nodeType}Summary`" :formData="currentObj"></component>
        </el-tab-pane>
        <el-tab-pane label="子机构" v-if="isOrganization(currentObj) || isDimension(currentObj)">
          <span slot="label"><svg-icon iconClass="organization"></svg-icon> 子机构</span>
          <OrgIndex :parentObj="currentObj" :dimension="dimension"></OrgIndex>
        </el-tab-pane>
        <el-tab-pane label="员工" v-if="!isEmployee(currentObj) && !isDimension(currentObj)">
          <span slot="label"><svg-icon iconClass="employee"></svg-icon> 员工</span>
          <EmployeeIndex :parentObj="currentObj"></EmployeeIndex>
        </el-tab-pane>
        <el-tab-pane label="岗位" v-if="isOrganization(currentObj)">
          <span slot="label"><svg-icon iconClass="position"></svg-icon> 岗位</span>
          <PositionIndex :parentObj="currentObj"></PositionIndex>
        </el-tab-pane>
        <el-tab-pane label="工作组"
                     v-if="!isPosition(currentObj) && !isEmployee(currentObj) && !isDimension(currentObj)">
          <span slot="label"><svg-icon iconClass="workgroup"></svg-icon> 工作组</span>
          <WorkgroupIndex :parentObj="currentObj"></WorkgroupIndex>
        </el-tab-pane>
      </el-tabs>
    </div>
  </secondary-menu>
  <!--<div class="p-5">-->
    <!--<div style="display:flex;">-->
      <!--<div style="width:350px">-->
        <!--<el-card style="height:calc(100vh - 150px);" class="body-no-padding">-->
          <!--<div slot="header">-->
            <!--<label>组织机构树</label>-->
            <!--<DimensionIndex style="float:right;margin-top:-10px;" @dimensionChanged="dimensionChanged"></DimensionIndex>-->
          <!--</div>-->

          <!--<div style="overflow-y: auto;height:calc(100vh - 240px);">-->
            <!--<OrgTree @removeListener="removeListener" ref="orgTree" class="mt-5" :dimension="dimension"-->
                     <!--@chooseNode="chooseObj"></OrgTree>-->
          <!--</div>-->
        <!--</el-card>-->
      <!--</div>-->
      <!--<div style="width:calc(100% - 360px)" class="ml-10">-->
        <!--<el-card style="height:calc(100vh - 150px);">-->
          <!---->
        <!--</el-card>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
  import OrgTree from './org/tree.vue'
  import DimensionIndex from './dimension/index.vue'
  import WorkgroupIndex from './workgroup/index.vue'
  import PositionIndex from './position/index.vue'
  import EmployeeIndex from './employee/index.vue'
  import OrgIndex from './org/index.vue'
  import EmployeeSummary from './employee/summary.vue'
  import PositionSummary from './position/summary.vue'
  import WorkgroupSummary from './workgroup/summary.vue'
  import DimensionSummary from './dimension/summary.vue'
  import OrganizationSummary from './org/summary.vue'
  import Base from './base.js'
  import SvgIcon from '../../../components/SvgIcon/index'

  export default {
    mixins: [Base],
    provide() {
      return {
        freshTreeNode: this.freshTreeNode,
      }
    },
    components: {
      SvgIcon,
      OrgTree,
      DimensionIndex,
      OrgIndex,
      WorkgroupIndex,
      PositionIndex,
      EmployeeIndex,
      EmployeeSummary,
      PositionSummary,
      WorkgroupSummary,
      DimensionSummary,
      OrganizationSummary,
    },
    data() {
      return {
        dimension: null,
        currentObj: null,
      }
    },
    watch: {},
    methods: {
      removeListener(data){
        if (this.currentObj) {
          if (this.currentObj.id === data.id) {
            this.currentObj = null
          }
        }
      },
      freshTreeNode() {
        this.$refs['orgTree'].freshTreeNode()
      },
      chooseObj(row) {
        this.currentObj = null
        this.$nextTick(() => {
          this.currentObj = row
        })
      },
      dimensionChanged(row) {
        this.dimension = row
      },
    },
  }
</script>
