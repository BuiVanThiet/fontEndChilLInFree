import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const getColumnSearchProps = (dataIndex, searchText, searchedColumn, handleSearch, handleReset) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                placeholder="Tìm kiếm"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Tìm kiếm
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Làm mới
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) => (searchedColumn === dataIndex ? (
        <span
            style={{
                // backgroundColor: '#ffc069',
                padding: 0,
            }}
        >
            {text}
        </span>
    ) : text),
});


export const convertData = (dataArray) => {
    return dataArray.map((item, index) => {
        return item.reduce((acc, value, i) => {
            acc[`object${i + 1}`] = value; // object1, object2, ...
            return acc;
        }, { key: index }); // Thêm key duy nhất cho React
    });
};

export const convertDataFillter = (dataArray) => {
    return dataArray.map((item) => ({
        text: item[2], // Phần tử thứ 3 trong mảng
        value: item[0] // Phần tử thứ 3 trong mảng
    }));
};

export const convertDataSelected = (dataArray) => {
    return dataArray.map((item) => ({
        label: item[2], // Phần tử thứ 3 trong mảng
        value: item[0],
        code: item[1], // Phần tử thứ 3 trong mảng
        data: item,
    }));
};

export const formatNumberWithCommas = (number) => {
    // Chuyển input thành chuỗi nếu chưa phải
    let str = number.toString();

    // Loại bỏ tất cả dấu ',' cũ (nếu có)
    str = str.replace(/,/g, "");

    // Thêm dấu ',' cứ mỗi 3 số từ phải sang trái
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatNumberWithCommasText = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//validate 
//phải là số nguyên và lớn hơn 0
function validateInteger(value) {
    if (isNaN(value) || value === null || value === "" || typeof value === "boolean") {
        return "Phải là số"; // ❌ Không phải số
    }

    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
        return "Phải là số"; // ❌ Không hợp lệ (Infinity, NaN)
    }

    if (!Number.isInteger(numberValue)) {
        return "Không phải số nguyên"; // ❌ Là số thực (có phần dư)
    }

    if (numberValue < 0) {
        return "Phải lớn hơn hoặc bằng 0"; // ❌ Số âm
    }

    if(nu)

    return true; // ✅ Hợp lệ
}



