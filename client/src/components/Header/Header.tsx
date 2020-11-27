import React from 'react';
import './style.css';
import DOMAIN from "../../DOMAIN";
import auth from "../types/auth";

interface Header {
    setModal: { (): void },
    auth: auth
    setAuth: { (auth: auth): void },
    setAdmin: { (value: boolean): void }
}

function addSection() {
    fetch('http://localhost/api/checkAdminRights/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
    }).then(response => {
        if (!response.ok) {
            return response.json();
        } else {
            let sectionName = prompt('Enter the name of the new section', '');
            let sectionDesc = prompt('Enter a description of the new section', '');
            const data = {
                section_name: sectionName,
                section_description: sectionDesc
            }
            if (sectionName != null && sectionDesc != null && sectionName.length < 150 && sectionDesc.length < 500) {
                fetch('http://localhost/api/addSection/', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify(data)

                }).then(response => {
                    if (!response.ok) {
                        return response.json()
                    } else {
                        alert('section added!');
                        document.location.reload();
                    }
                }).then(result => {
                    if (result !== undefined) {
                        alert(result.error);
                    }
                });
            } else {
                alert('Check input');
            }

        }
    }).then(result => {
        if (result !== undefined) {
            alert(result.error);
        }
    })
}

function Header(props: Header) {
    if (!props.auth.isAuth) {
        return (
            <div id={'header'}>
                <div className={'header-button'}>
                    <p onClick={() => {
                        props.setModal()
                    }}>LOGIN</p>
                </div>
            </div>
        )
    } else {
        return (
            <div id={'header'}>
                <div className={'header-wrapper'}>
                    <div className={'logout'} onClick={() => {
                        let token: string | null = sessionStorage.getItem('token');
                        // @ts-ignore
                        fetch(DOMAIN + '/api/auth/logout', {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                'Content-type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                                'Authorization': 'Bearer ' + token
                            },
                        });
                        props.setAuth({
                            name: '',
                            isAuth: false
                        });
                        sessionStorage.clear();
                    }}>
                        <p>LOGOUT</p>
                    </div>
                    <div className={'header-button-greeting'}>
                        <p className="admin-question" onClick={() => {
                            addSection()
                        }}>
                            {props.auth.name}, do you want to add a new section?
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
