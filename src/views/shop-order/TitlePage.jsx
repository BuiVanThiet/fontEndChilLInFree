import React from "react";

class TitleCategory extends React.Component {
    render() {
        let title = this.props.titleCustom;
        return (<>
            <div className="uppercase text-center text-2xl text-red-600">
                {title}
            </div>
            <hr className="bg-red-600 h-[1px] border-none mb-3" />
        </>)
    }
}

export default TitleCategory;
