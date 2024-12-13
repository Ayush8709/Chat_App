import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  
  messages: [],
  setMessage: (messages) => set({ messages }),
}));


export default useConversation;


// Zustand ek state management library hai jo aapko global state manage karne ki suvidha deti hai, bina React Context ya Redux ke.

// create function se ek store create kiya gaya hai, jisme do properties aur unke update functions hain:

// selectedConversation: Yeh current selected conversation ko store karta hai.
//   setSelectedConversation: Yeh function selected conversation ko update karta hai.
//     messages: Yeh conversation ke messages ko store karta hai.
//       setMessage: Yeh function messages ko update karta hai.
// Yeh custom hook(useConversation) use karke, aap selectedConversation aur messages ko globally access aur update kar sakte hain.