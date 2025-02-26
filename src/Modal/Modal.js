import React from "react"

const modal = props =>{
    <div>
        <header>
            {props.title}
        </header>
        <section className="modal_content"></section>
        <section className="modal_actions"></section>
    </div>
}

export default modal