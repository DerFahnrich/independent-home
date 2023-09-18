import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {OpenInNew} from "@mui/icons-material";

import StandardWidget from "@commons/standard-widget/StandardWidget";
import WidgetDivider from "@commons/widget-content/widget-divider/WidgetDivider"
import SupportWidgetSkeleton from "@components/dashboard/support-widget/SupportWidgetSkeleton";
import useAppSelector from "@hooks/useAppSelector";
import ILogo from "@interfaces/ILogo";
import NetworkService from "@services/networkService";

import {selectCustomerIsLoading, selectCustomer} from "@store/dashboard-store/dashboardSlice"

import "./SupportWidget.css";

interface ISupportWidgetProps {
    className?: string;
}

const SupportWidget = ({className}: ISupportWidgetProps) => {
    const customer = useAppSelector(selectCustomer);
    const customerIsLoading = useAppSelector(selectCustomerIsLoading);
    const [logo, setLogo] = useState("")
    const [logoIsLoading, setLogoIsLoading] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        fetchLogo();
    }, []);

    const fetchLogo = async (): Promise<void> => {
        const URLToFetchLogo = "/api/internal/v2/branding/logo";
        try {
            const response: Response = await NetworkService.sendGet(URLToFetchLogo);
            const logo: ILogo = await response.json();
            const logoUrlString = logo.logo48LightMode.url;
            setLogo(logoUrlString)
        } catch (error) {
            console.error("Unable to fetch logo", error);
        } finally {
            setLogoIsLoading(false);
        }
    };

    const renderLogo = (): JSX.Element | null => {
        if (logoIsLoading) {
            return <span className="logo-container"/>
        }

        if (logo) {
            return <div className="logo-container">
                <img src={logo} alt="Logo"/>
            </div>
        }

        return null;
    };
    const renderSupportText = (): JSX.Element => {
        if (customerIsLoading) {
            return <div className="widget-help-text"/>
        }

        return <div className="widget-help-text">{t("admin_dashboard.support-widget.support")}</div>
    };
    const renderCustomerSupportPhone = (): JSX.Element | null => {
        if (customerIsLoading) {
            return <p className="number"/>
        }

        if (customer != null) {
            return (
                <p className="number">
                    {
                        customer.retailer.supportTelephone.nationalFormat ?
                            customer.retailer.supportTelephone.nationalFormat :
                            customer.retailer.supportTelephone.number
                    }
                </p>
            )
        }

        return null;
    };

    const renderCustomerSupportEmail = (): JSX.Element | null => {
        if (customerIsLoading) {
            return <span className="email"/>
        }

        if (customer !== null) {
            return (
                <a
                    className="email"
                    href={'mailto:' + customer.retailer.supportEmail}
                >
                    {customer?.retailer.supportEmail}
                </a>
            )
        }

        return null;

    };

    const renderCustomerSupportWebUrl = (): JSX.Element | null => {
        if (customerIsLoading) {
            return <span className="faq-container"/>
        }

        if (customer !== null && customer.retailer.retailerUrl !== "") {
            return (
                <div className="support-container">
                    <WidgetDivider/>
                    <div className="faq-container">
                        <a className="faq-text"
                           href={customer.retailer.retailerUrl}
                           target="_blank"
                           rel="noopener noreferrer">
                            {customer.retailer.retailerUrl.replace(/^https?:\/\//, '')}
                        </a>
                        <OpenInNew className="icon"/>
                    </div>
                </div>
            )
        }

        return null;

    };

    return (
        <StandardWidget className={className}>
            {
                customerIsLoading || logoIsLoading
                    ? <SupportWidgetSkeleton/>
                    : (
                        <div className="support-widget-container">
                            {renderLogo()}
                            <div className="support-detail-container">
                                {renderSupportText()}
                                {renderCustomerSupportPhone()}
                                {renderCustomerSupportEmail()}
                            </div>
                            {renderCustomerSupportWebUrl()}
                        </div>
                    )
            }
        </StandardWidget>
    );
};

export default SupportWidget;
