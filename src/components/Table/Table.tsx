/*
 * @ModuleName: Custom Table
 * @Author: 乐涛
 * @LastEditTime: 2022-02-11 15:23:12
 */
import { defineComponent, ref } from "vue";
import { props, emits, ElTable } from "./index";

export default defineComponent({
  props,
  emits,
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>();

    const clearSelection = () => tableRef.value?.clearSelection();
    const toggleRowSelection = (...args: any[]) => tableRef.value?.toggleRowSelection(args[0], args[1]);
    const toggleAllSelection = () => tableRef.value?.toggleAllSelection();
    const toggleRowExpansion = (...args: any[]) => tableRef.value?.toggleRowExpansion(args[0], args[1]);
    const setCurrentRow = (...args: any[]) => tableRef.value?.setCurrentRow(args);
    const clearSort = () => tableRef.value?.clearSort();
    const clearFilter = (...args: any[]) => tableRef.value?.clearFilter(args);
    const doLayout = () => tableRef.value?.doLayout();
    const sort = (...args: any[]) => tableRef.value?.sort(args[0], args[1]);

    return {
      // ref
      tableRef,

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
    const p = this.$props;
    const slots = this.$slots;
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
      >
        {elTableColumns}
      </el-table>
    );
  },
});
