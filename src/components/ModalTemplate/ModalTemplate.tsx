import React, {useState} from "react";

function ModalTemplate() {
    const [isHidden, setIsHidden] = useState(true);
    let targetClass: string = '';
    if (isHidden) {
        targetClass = 'hidden';
    }
    return (
        <div id={'bg-modal'} className={targetClass} hidden={isHidden}>
            <div className={'modal'}>
                <div className={'modal-wrapper'}>
                    <div className={'modal-header'}>
                        <div onClick={() => setIsHidden(false)} className="modal-checkbox-item">X</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ModalTemplate;
