/*
 * @ModuleName: Custom Table
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-29 22:23:57
 */
import { defineComponent, onMounted, watch, reactive, ref, toRefs, unref } from "vue";
import Sortable from "sortablejs"
import { tableProps, tableEmits } from "./options";
import { ElTable, ElLoading } from "./element"

export default defineComponent({
  props: tableProps,
  emits: tableEmits,
  setup(props, { emit }) {
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const state = reactive({
      pageSize: props.pageSize,
      pageNumber: props.pageNumber,
      total: props.total,
    });

    watch(() => props, (v) => {
      state.pageNumber = v.pageNumber
      state.pageSize = v.pageSize
      state.total = v.total
    }, { deep: true })

    let tableLoading:any = null
 
    const clearSelection = () => tableRef.value?.clearSelection();
    const toggleRowSelection = (...args: any[]) => tableRef.value?.toggleRowSelection(args[0], args[1]);
    const toggleAllSelection = () => tableRef.value?.toggleAllSelection();
    const toggleRowExpansion = (...args: any[]) => tableRef.value?.toggleRowExpansion(args[0], args[1]);
    const setCurrentRow = (...args: any[]) => tableRef.value?.setCurrentRow(args);
    const clearSort = () => tableRef.value?.clearSort();
    const clearFilter = (...args: any[]) => tableRef.value?.clearFilter(args);
    const doLayout = () => tableRef.value?.doLayout();
    const sort = (...args: any[]) => tableRef.value?.sort(args[0], args[1]);

    onMounted(() => {
      if (props.drag) {
        new Sortable(
          unref(tableRef)?.$el.querySelector(".el-table__body-wrapper tbody"),
          {
            animation: 150,
            filter: ".drag_disabled",
            onEnd: (e) => emit("drag-end", e),
            onStart: (e) => emit("drag-start", e),
          },
        )
      }
    })

    watch(() => props.loading, (v) => {
      if (v) {
        tableLoading = ElLoading.service({
          target: unref(tableRef)?.$el.querySelector(".el-table__body-wrapper"),
          text: "Loading...",
        })
        return
      }
      tableLoading && tableLoading.close()
    })

    return {
      // ref
      tableRef,

      // refs
      ...toRefs(state),

      // func
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      toggleRowExpansion,
      setCurrentRow,
      clearSort,
      clearFilter,
      doLayout,
      sort,
    };
  },
  render() {
    const props = this.$props;
    const slots = this.$slots;
    const emit = this.$emit;
    const pageChange = () => {
      emit("update:pageSize", this.pageSize);
      emit("update:pageNumber", this.pageNumber);
      emit("page-change");
    };
    const elTableColumns = props.columns?.map((f) => {
      const column = (
        <el-table-column
          label={f.label}
          prop={f.prop}
          width={f.width}
          type={f.type}
          index={f.index}
          column-key={f.columnKey}
          min-width={f.minWidth}
          fixed={f.fixed}
          render-header={f.renderHeader}
          sortable={f.sortable}
          sort-method={f.sortMethod}
          sort-by={f.sortBy}
          sort-orders={f.sortOrders}
          resizable={f.resizable}
          formatter={f.formatter}
          show-overflow-tooltip={f.showOverflowTooltip}
          align={f.align}
          header-align={f.headerAlign}
          class-name={f.className}
          label-class-name={f.labelClassName}
          selectable={f.selectable}
          reserve-selection={f.reserveSelection}
          filters={f.filters}
          filter-placement={f.filterPlacement}
          filter-multiple={f.filterMultiple}
          filter-method={f.filterMethod}
          filter-value={f.filterdValue}
        ></el-table-column>
      );
      if (f.slot) {
        const column_slot = slots[f.prop];
        return <column>{column_slot}</column>;
      }
      return column;
    });

    return (
      <div class="g_table_root">
        {/* 头部,表单查询 - 默认插槽#default */}
        <div class="g_table_nav">{slots.default?.()}</div>
        <div class="g_table_table">
          <el-table
            ref="tableRef"
            data={props.data}
            height={props.height}
            max-height={props.maxHeight}
            stripe={props.stripe}
            border={props.border}
            size={props.size}
            fit={props.fit}
            show-header={props.showHeader}
            highlight-current-row={props.highlightCurrentRow}
            current-row-key={props.currentRowKey}
            row-class-name={props.rowClassName}
            row-style={props.rowStyle}
            cell-class-name={props.cellClassName}
            cell-style={props.cellStyle}
            header-row-class-name={props.headerRowClassName}
            header-row-style={props.headerRowStyle}
            header-cell-class-name={props.headerCellClassName}
            header-cell-style={props.headerCellStyle}
            row-key={props.rowKey}
            empty-text={props.emptyText}
            default-expand-all={props.defaultExpandAll}
            default-sort={props.defaultSort}
            tooltip-effect={props.tooltipEffect}
            show-summary={props.showSummary}
            sum-text={props.sumText}
            summary-method={props.summaryMethod}
            span-method={props.spanMethod}
            select-on-indeterminate={props.selectOnIndeterminate}
            indent={props.indent}
            lazy={props.lazy}
            load={props.load}
            tree-props={props.treeProps}
            onSelect={(...args: any[]) => { emit("select", ...args) }}
            onSelectAll={(...args: any[]) => { emit("select-all", ...args) }}
            onSelectionChange={(...args: any[]) => { emit("selection-change", ...args) }}
            onCellMouseEnter={(...args:any[]) => { emit("cell-mouse-enter", ...args) }}
            onCellMouseLeave={(...args:any[]) => { emit("cell-mouse-leave", ...args) }}
            onCellClick={(...args:any[]) => { emit("cell-click", ...args) }}
            onCellDblclick={(...args:any[]) => { emit("cell-dblclick", ...args) }}
            onCellContextmenu={(...args:any[]) => { emit("cell-contextmenu", ...args) }}
            onRowClick={(...args:any[]) => { emit("row-click", ...args) }}
            onRowContextmenu={(...args:any[]) => { emit("row-contextmenu", ...args) }}
            onRowDblclick={(...args:any[]) => { emit("row-dblclick", ...args) }}
            oHeaderClick={(...args:any[]) => { emit("header-click", ...args) }}
            onHeaderContextmenu={(...args:any[]) => { emit("header-contextmenu", ...args) }}
            onSortChange={(...args:any[]) => { emit("sort-change", ...args) }}
            onFilterChange={(...args:any[]) => { emit("filter-change", ...args) }}
            onCurrentChange={(...args:any[]) => { emit("current-change", ...args) }}
            onHeaderDragend={(...args:any[]) => { emit("header-dragend", ...args) }}
            onExpandChange={(...args:any[]) => { emit("expand-change", ...args) }}
          >
            {elTableColumns}
          </el-table>
        </div>
        {/* 底部,Page分页 */}
        <div v-show={props.page} class="g_table_page">
          <g-page page-align={ props.pageAlign} v-model:pageNumber={this.pageNumber} v-model:pageSize={this.pageSize} v-model:total={this.total} onChange={() => pageChange()}></g-page>
        </div>
      </div>
    );
  },
});
