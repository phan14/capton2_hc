// import React, { useContext } from 'react';
// import '../Toggle/toggle.css';
// import { CreateLinkAccountContext } from '../../contexts/CreateLinkAccountContext';

// function ToggleSwitch({ check, data, id }) {
//     const { checked, toggleChecked } = useContext(CreateLinkAccountContext);

//     return (
//         <div
//             id={data.id}
//             className={`${
//                 checked === check
//                     ? 'toggle-switch bg-[#016e1a] rounded-full flex items-center '
//                     : 'toggle-switch bg-gray-500 rounded-full flex items-center '
//             }`}
//             onClick={() => {
//                 console.log(id);
//                 toggleChecked();
//             }}
//         >
//             <div className={`toggle-switch-inner ${checked === check ? 'checked' : ''}`}></div>
//             {/* <div className={`toggle-switch-switch ${checked ? 'checked' : ''}`}></div> */}
//         </div>
//     );
// }

// export default ToggleSwitch;
