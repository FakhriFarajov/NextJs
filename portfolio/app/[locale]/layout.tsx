import Provider from "@/components/providers/IntlProvider";
import { getMessages } from "next-intl/server";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = params;
    const messages = await getMessages({locale});
    
    return (
        <Provider messages={messages}>
            {children}
        </Provider>
    )
}