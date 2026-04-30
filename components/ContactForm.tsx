// "use client";
// // import { sendEmail } from "@/app/actions/send-email";
// import { ChangeEvent, useReducer, useState } from "react";
// import styles from "@/app/contact/contact.module.css";

// export type FormState = {
//   name: string;
//   email: string;
//   message: string;
// };

// type FormAction =
//   | { type: "UPDATE_NAME"; payload: string }
//   | { type: "UPDATE_EMAIL"; payload: string }
//   | { type: "UPDATE_MESSAGE"; payload: string }
//   | { type: "RESET" };

// const initialState = {
//   name: "",
//   email: "",
//   message: "",
// };

// const reducer = (state: FormState, action: FormAction) => {
//   switch (action.type) {
//     case "UPDATE_NAME":
//       return { ...state, name: action.payload };
//     case "UPDATE_EMAIL":
//       return { ...state, email: action.payload };
//     case "UPDATE_MESSAGE":
//       return { ...state, message: action.payload };
//     case "RESET":
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default function ContactForm({ className }: { className: string }) {
//   const [message, setMessage] = useState("");
//   const [formDisabled, setFormDisabled] = useState(false);
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleFormAction = async () => {
//     setFormDisabled(true);
//     setMessage("Sending...");
//     const response = await sendEmail(state);
//     setMessage(response.message);

//     if (response.success) {
//       dispatch({ type: "RESET" });
//     }
//     setFormDisabled(true);
//   };
//   const handleOnClick = () => {
//     dispatch({ type: "RESET" });
//   };
//   const handleOnChange = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = event.target;

//     switch (name) {
//       case "name":
//         dispatch({ type: "UPDATE_NAME", payload: value });
//         break;
//       case "email":
//         dispatch({ type: "UPDATE_EMAIL", payload: value });
//         break;
//       case "message":
//         dispatch({ type: "UPDATE_MESSAGE", payload: value });
//         break;
//     }
//   };
//   return (
//     <>
//       {message.length > 0 && <div className={styles.statusMessage}>{message}</div>}
//       <form className={className} action={handleFormAction}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             required
//             onChange={handleOnChange}
//             value={state.name}
//             disabled={formDisabled}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             onChange={handleOnChange}
//             value={state.email}
//             disabled={formDisabled}
//           />
//         </div>
//         <div>
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             required
//             onChange={handleOnChange}
//             value={state.message}
//             disabled={formDisabled}
//           ></textarea>
//         </div>
//         <div>
//           <button type="submit" disabled={formDisabled}>
//             Send
//           </button>
//           <button onClick={handleOnClick} disabled={formDisabled}>
//             Reset
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }
