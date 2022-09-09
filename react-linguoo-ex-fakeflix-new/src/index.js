import "./index.scss"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"
import {I18nextProvider} from 'react-i18next'
import i18next from "i18next";
import global_es from './translations/es/global.json'
import global_en from './translations/en/global.json'
i18next.init({
	interpolation : { escapeValue: false},
	lng : "es",
	resources : {
		es: {
			global : global_es
		},
		en: {
			global : global_en
		}
	}
})
ReactDOM.render(
    <I18nextProvider i18n={i18next}>
    <React.StrictMode>
       <Provider store={store}>
           <BrowserRouter>
               <PersistGate persistor={persistor}>
                   <App />
               </PersistGate>
           </BrowserRouter>
       </Provider>
   </React.StrictMode>
  </I18nextProvider>,
  document.getElementById("root")
)