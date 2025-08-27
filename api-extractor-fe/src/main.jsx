import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import posthog from 'posthog-js'

posthog.init('phc_jisKIOvB2pvEp2n6CKLnANwILZ6KzpGGLdF9OT96IGD',
    {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'always' // or 'always' to create profiles for anonymous users as well
    }
)

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
