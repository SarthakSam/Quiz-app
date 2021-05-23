
export function NewCategory({ closePopup }: { closePopup: Function }) {
    return (
        <div className="popup__container" style={{ display: 'initial' }}>
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title">Popup Header</p>
                    <i className="fa fa-times popup__close"></i>
                </div>
                <div className="popup__body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eaque.</div>
                <div className="popup__footer">
                    <div className="popup__footer__buttons">
                        <button className="btn btn--secondary popup__close" onClick = { () => { closePopup() } } >cancel</button>
                        <button className="btn btn--primary">submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}