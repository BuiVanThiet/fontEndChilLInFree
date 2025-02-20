// import React from 'react';
// import { Table } from 'antd';
// import { createStyles } from 'antd-style';

// const useStyle = createStyles(({ css, token }) => {
//   const { antCls } = token;
//   return {
//     customTable: css`
//       ${antCls}-table {
//         ${antCls}-table-container {
//           ${antCls}-table-body,
//           ${antCls}-table-content {
//             scrollbar-width: thin;
//             scrollbar-color: #eaeaea transparent;
//             scrollbar-gutter: stable;
//           }
//         }
//       }
//     `,
//   };
// });



// const BoxTable = ({ columnsColor, dataColor, checkBoxTable, rowSelection, dataRootProductDetail }) => {
//   const { styles } = useStyle();
//   const isDuplicate = (record) =>
//     dataRootProductDetail?.some(root => record.color.value === root.object5 && record.size.value === root.object2) ?? false;
//   return (
//     <>
//       <Table
//         rowClassName={(record) => {
//           const isDup = dataRootProductDetail !== null && isDuplicate(record);
//           return isDup ? "row-duplicate" : "";
//         }}
//         rowSelection={checkBoxTable === 1 ? rowSelection : undefined}
//         className={styles.customTable}
//         columns={columnsColor}
//         dataSource={dataColor}
//         locale={{
//           filterConfirm: 'Tìm kiếm',
//           filterReset: 'Làm mới',
//           filterTitle: 'Bộ lọc',
//         }}
//         scroll={{
//           x: 'max-content',
//           y: 75 * 5,
//         }}
//       />
//     </>
//   );

// };

// export default BoxTable;

import React, { useState } from 'react';
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Kiểm tra hàng có bị trùng không
  const isDuplicate = (record) =>
    dataRootProductDetail?.some(root => record.color.value === root.object5 && record.size.value === root.object2) ?? false;

  // Cập nhật rowSelection, loại bỏ hàng trùng khỏi danh sách chọn
  const handleRowSelectionChange = (selectedKeys, selectedRows) => {
    const filteredKeys = selectedRows
      .filter(record => !isDuplicate(record)) // Loại bỏ các hàng trùng
      .map(record => record.key);

    setSelectedRowKeys(filteredKeys);
  };

  return (
    <>
      <Table
        rowClassName={(record) => (isDuplicate(record) ? "row-duplicate" : "")}
        rowSelection={
          checkBoxTable === 1
            ? {
                selectedRowKeys,
                onChange: handleRowSelectionChange,
              }
            : undefined
        }
        className={styles.customTable}
        columns={columnsColor}
        dataSource={dataColor}
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
    </>
  );
};

export default BoxTable;
