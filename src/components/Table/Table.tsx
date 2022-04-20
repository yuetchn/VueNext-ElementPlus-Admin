/*
 * @ModuleName: Custom Table
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-20 17:41:57
 */
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from "vue";
import Sortable from "sortablejs"
import { props, emits, ElTable } from "./index";
import style from "./Table.module.scss";

export default defineComponent({
  props,
  emits,
  setup(p, { emit }) {
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const state = reactive({
      pageSize: p.pageSize,
      pageNumber: p.pageNumber,
    });
    const clearSelection = () => tableRef.value?.clearSelection();
    const toggleRowSelection = (...args: any[]) => tableRef.value?.toggleRowSelection(args[0], args[1]);
    const toggleAllSelection = () => tableRef.value?.toggleAllSelection();
    const toggleRowExpansion = (...args: any[]) => tableRef.value?.toggleRowExpansion(args[0], args[1]);
    const setCurrentRow = (...args: any[]) => tableRef.value?.setCurrentRow(args);
    const clearSort = () => tableRef.value?.clearSort();
    const clearFilter = (...args: any[]) => tableRef.value?.clearFilter(args);
    const doLayout = () => tableRef.value?.doLayout();
    const sort = (...args: any[]) => tableRef.value?.sort(args[0], args[1]);
    const pageChange = () => {
      emit("update:pageSize", state.pageSize);
      emit("update:pageNumber", state.pageNumber);
      emit("page-change");
    };

    onMounted(() => {
      if (p.drag) {
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
      pageChange,
    };
  },
  render() {
    const p = this.$props;
    const slots = this.$slots;
    const emit = this.$emit;
    const elTableColumns = p.columns?.map((f) => {
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
      <div class={style.g_table_root}>
        {/* 头部,表单查询 - 默认插槽#default */}
        <div class={style.m_table_nav}>{slots.default?.()}</div>
        <div class={style.m_table_table}>
          <el-table
            ref="tableRef"
            data={p.data}
            height={p.height}
            max-height={p.maxHeight}
            stripe={p.stripe}
            border={p.border}
            size={p.size}
            fit={p.fit}
            show-header={p.showHeader}
            highlight-current-row={p.highlightCurrentRow}
            current-row-key={p.currentRowKey}
            row-class-name={p.rowClassName}
            row-style={p.rowStyle}
            cell-class-name={p.cellClassName}
            cell-style={p.cellStyle}
            header-row-class-name={p.headerRowClassName}
            header-row-style={p.headerRowStyle}
            header-cell-class-name={p.headerCellClassName}
            header-cell-style={p.headerCellStyle}
            row-key={p.rowKey}
            empty-text={p.emptyText}
            default-expand-all={p.defaultExpandAll}
            default-sort={p.defaultSort}
            tooltip-effect={p.tooltipEffect}
            show-summary={p.showSummary}
            sum-text={p.sumText}
            summary-method={p.summaryMethod}
            span-method={p.spanMethod}
            select-on-indeterminate={p.selectOnIndeterminate}
            indent={p.indent}
            lazy={p.lazy}
            load={p.load}
            tree-props={p.treeProps}
            on-select={emit("select")}
            on-select-all={emit("select-all")}
            selection-change={emit("selection-change")}
            cell-mouse-enter={emit("cell-mouse-enter")}
            cell-mouse-leave={emit("cell-mouse-leave")}
            cell-click={emit("cell-click")}
            cell-dblclick={emit("cell-dblclick")}
            cell-contextmenu={emit("cell-contextmenu")}
            row-click={emit("row-click")}
            row-contextmenu={emit("row-contextmenu")}
            row-dblclick={emit("row-dblclick")}
            header-click={emit("header-click")}
            header-contextmenu={emit("header-contextmenu")}
            sort-change={emit("sort-change")}
            filter-change={emit("filter-change")}
            current-change={emit("current-change")}
            header-dragend={emit("header-dragend")}
            expand-change={emit("expand-change")}
          >
            {elTableColumns}
          </el-table>
        </div>
        {/* 底部,Page分页 */}
        <div v-show={p.page} class={style.m_table_page}>
          <g-page page-align={ p.pageAlign} v-model:pageNumber={this.pageNumber} v-model:pageSize={this.pageSize} total={this.total} on-change={this.pageChange()}></g-page>
        </div>
      </div>
    );
  },
});
