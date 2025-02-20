import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Select } from 'antd';

class BoxTopProductSellWell extends React.Component {
    render() {
        const data = [
            { name: 'Tháng 1', soLuongBan: 2400 },
            { name: 'Tháng 2', soLuongBan: 2000 },
            { name: 'Tháng 3', soLuongBan: 2700 },
            { name: 'Tháng 4', soLuongBan: 4000 },
            { name: 'Tháng 5', soLuongBan: 2400 },
            { name: 'Tháng 6', soLuongBan: 2000 },
            { name: 'Tháng 7', soLuongBan: 2700 },
            { name: 'Tháng 8', soLuongBan: 2400 },
            { name: 'Tháng 9', soLuongBan: 2000 },
            { name: 'Tháng 10', soLuongBan: 2700 },
            { name: 'Tháng 11', soLuongBan: 2700 },
            { name: 'Tháng 12', soLuongBan: 2700 },
        ];
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };
        return (<>

            <div className="flex items-center justify-between w-full">
                {/* Bên trái */}
                <div className="flex items-center gap-4">
                    <span className="text-black font-bold">Top 10 sản phẩm bán chạy</span>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Theo doanh thu thuần' },
                            { value: 'lucy', label: 'Theo số lượng bán' },
                        ]}
                    />
                </div>

                {/* Bên phải */}
                <Select
                    defaultValue="lucy"
                    style={{ width: 200 }}
                    onChange={handleChange}
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
            </div>


            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>

                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="soLuongBan" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" name="Số lượng bán" />
                </AreaChart>
            </ResponsiveContainer>
        </>)
    }
}

export default BoxTopProductSellWell;