import React from "react";
import Album from "./Album";

class PageAlbum extends React.Component {
    render() {
        return (
            <>
                <title>ChillInfree - Album</title>
                <this.props.TitlePage titleCustom={"Album"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center m-2 gap-4">
                    <div className="w-full flex flex-col-reverse">
                        <Album idSlide={1} />
                    </div>
                    <div className="w-full hidden sm:block ">
                        <Album idSlide={2} />
                    </div>
                    <div className="w-full flex-col-reverse hidden lg:block">
                        <Album idSlide={3} />
                    </div>
                    <div className="w-full hidden lg:block">
                        <Album idSlide={4} />
                    </div>
                </div>

            </>
        );
    }
}

export default PageAlbum;
