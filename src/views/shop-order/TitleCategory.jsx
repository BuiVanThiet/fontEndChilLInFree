import React from "react";

class TitleCategory extends React.Component {
    render() {
        let title = this.props.titleCustom;
        return (<>
            <div className="bvt-subheadline-custome">
                <div className="bvt-subheadline-deco-line">

                </div>
                <div className="bvt-subheadline-label">
                    {title}
                </div>
                <div className="bvt-subheadline-deco-line">

                </div>
            </div>
        </>)
    }
}

export default TitleCategory;
