import React from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});



const BoxTable = ({ columnsColor, dataColor, checkBoxTable, rowSelection, dataRootProductDetail }) => {
  const { styles } = useStyle();
  const isDuplicate = (record) => {
    return existingData.some(root => record.idColor === root.object5 && record.idSize === root.object2);
};
  return (
    <Table

      rowSelection={checkBoxTable === 1 ? rowSelection : undefined}
      className={styles.customTable}
      columns={columnsColor}   // Sử dụng props trực tiếp
      dataSource={dataColor}   // Sử dụng props trực tiếp
      locale={{
        filterConfirm: 'Tìm kiếm',
        filterReset: 'Làm mới',
        filterTitle: 'Bộ lọc',
      }}
      scroll={{
        x: 'max-content',
        y: 75 * 5,
      }}
    />
  );
};

export default BoxTable;
