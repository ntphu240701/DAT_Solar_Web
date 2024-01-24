import React from 'react';
import './User.scss';
import { FaRegUser } from 'react-icons/fa';

function User(props) {
    return (
        <>
            <div className='DAT_UsrHeader'>
                <div className='DAT_UsrHeader_Title'>
                    <FaRegUser color='gray' size={25} /> <span>Người dùng</span>
                </div>
            </div>
            <div className='DAT_Usr'>
                <div className='DAT_Usr_Item'>
                    <div className='DAT_Usr_Item_Content'>
                        <div className='DAT_Usr_Item_Content_Title'>Ảnh đại diện</div>
                        <img src={"/dat_icon/user_manager.png"} alt="" />
                    </div>
                    <span>Chỉnh sửa</span>
                </div>

                <div className='DAT_Usr_Item'>
                    <div className='DAT_Usr_Item_Content'>
                        <div className='DAT_Usr_Item_Content_Title'>Tên</div>
                        <div className='DAT_Usr_Item_Content_Label'>RnD Center</div>
                    </div>
                    <span>Chỉnh sửa</span>
                </div>

                <div className='DAT_Usr_Item'>
                    <div className='DAT_Usr_Item_Content'>
                        <div className='DAT_Usr_Item_Content_Title'>E-mail</div>
                        <div className='DAT_Usr_Item_Content_Label'>Admin@datgroup.com.vn</div>
                    </div>
                    <span>Chỉnh sửa</span>
                </div>

                <div className='DAT_Usr_Item'>
                    <div className='DAT_Usr_Item_Content'>
                        <div className='DAT_Usr_Item_Content_Title'>Mật khẩu</div>
                        <div className='DAT_Usr_Item_Content_Label'>********</div>
                    </div>
                    <span>Chỉnh sửa</span>
                </div>
            </div>
        </>
    );
}

export default User;