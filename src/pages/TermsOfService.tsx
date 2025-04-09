
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, Clock, Scale, Shield, GlobeLock, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const TermsOfService: React.FC = () => {
  const lastUpdated = "April 1, 2024";

  return (
    <>
      <Helmet>
        <title>Terms of Service | InvoiceAI - Usage Agreement</title>
        <meta name="description" content="Read InvoiceAI's Terms of Service to understand your rights and responsibilities when using our platform." />
        <meta name="keywords" content="terms of service, legal agreement, terms and conditions, user agreement" />
        <meta property="og:title" content="Terms of Service | InvoiceAI" />
        <meta property="og:description" content="Read InvoiceAI's Terms of Service to understand your rights and responsibilities when using our platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/terms" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/terms" />
      </Helmet>

      <div className="pb-16">
        <PageHeader
          pageName="Terms of Service"
          title="Terms of Service Agreement"
          description="Please read these terms carefully before using our platform."
          backgroundClass="bg-primary/5"
        />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Terms of Service</h2>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-gray max-w-none"
            >
              <h2>Introduction</h2>
              <p>
                Welcome to InvoiceAI. These Terms of Service ("Terms") govern your access to and use of the InvoiceAI platform, website, and services (collectively, the "Services"), operated by InvoiceAI, Inc. ("InvoiceAI," "we," "us," or "our").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Services.
              </p>

              <h2>1. Account Registration and Security</h2>
              <h3>1.1 Registration</h3>
              <p>
                To use most features of the Services, you must register for an account. When you register, you must provide accurate and complete information and keep this information updated.
              </p>

              <h3>1.2 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
              </p>
              <ul>
                <li>Create a strong password and keep it secure</li>
                <li>Restrict access to your account</li>
                <li>Notify us immediately of any unauthorized access or use of your account</li>
                <li>Ensure that you log out of your account at the end of each session</li>
              </ul>

              <h3>1.3 Eligibility</h3>
              <p>
                You must be at least 18 years old to use the Services. By using the Services, you represent and warrant that you meet all eligibility requirements.
              </p>

              <h2>2. Subscription and Payments</h2>
              <h3>2.1 Subscription Plans</h3>
              <p>
                We offer various subscription plans for our Services. The features and limitations of each plan are described on our pricing page. We may change our plans and pricing at any time.
              </p>

              <h3>2.2 Payment Terms</h3>
              <p>
                You agree to pay all fees associated with your subscription plan. Unless otherwise stated:
              </p>
              <ul>
                <li>All fees are quoted in US dollars</li>
                <li>Payments are non-refundable</li>
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>Your subscription will automatically renew unless you cancel it</li>
              </ul>

              <h3>2.3 Taxes</h3>
              <p>
                You are responsible for paying all taxes associated with your use of the Services, except for taxes based on our net income.
              </p>

              <h3>2.4 Cancellation and Refunds</h3>
              <p>
                You may cancel your subscription at any time through your account settings. When you cancel:
              </p>
              <ul>
                <li>You will not receive a refund for the current billing cycle</li>
                <li>You will continue to have access to the Services until the end of your current billing cycle</li>
                <li>Your account will not be renewed for the following billing cycle</li>
              </ul>

              <h2>3. Use of Services</h2>
              <h3>3.1 Acceptable Use</h3>
              <p>
                You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul>
                <li>Use the Services in any way that violates any applicable law or regulation</li>
                <li>Use the Services to infringe the rights of others</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Attempt to reverse engineer or extract the source code of the Services</li>
                <li>Use the Services to transmit any malware, viruses, or other harmful code</li>
                <li>Use the Services to send unsolicited communications (spam)</li>
              </ul>

              <h3>3.2 User Content</h3>
              <p>
                Our Services allow you to upload, submit, store, send, or receive content, including invoices and other financial documents ("User Content"). You retain ownership of your User Content.
              </p>
              <p>
                By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with providing the Services to you.
              </p>

              <h3>3.3 Responsibility for User Content</h3>
              <p>
                You are solely responsible for your User Content and the consequences of uploading it. You represent and warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to use and authorize us to use your User Content</li>
                <li>Your User Content does not violate the rights of any third party</li>
                <li>Your User Content complies with these Terms and all applicable laws</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <h3>4.1 Our Intellectual Property</h3>
              <p>
                The Services and their content, features, and functionality are owned by InvoiceAI and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3>4.2 License to Use Services</h3>
              <p>
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Services for your internal business purposes.
              </p>

              <h3>4.3 Feedback</h3>
              <p>
                If you provide feedback about the Services, you grant us an unlimited, irrevocable, perpetual, sublicensable, transferable, royalty-free license to use such feedback for any purpose without compensation to you.
              </p>

              <h2>5. Privacy and Data Security</h2>
              <h3>5.1 Privacy Policy</h3>
              <p>
                Our Privacy Policy explains how we collect, use, and disclose information about you. By using the Services, you consent to our collection, use, and disclosure of information as described in our Privacy Policy.
              </p>

              <h3>5.2 Data Security</h3>
              <p>
                We implement reasonable security measures to protect your data. However, no system is perfectly secure, and we cannot guarantee the security of your data. You are responsible for maintaining the security of your account credentials.
              </p>

              <h2>6. Disclaimers</h2>
              <h3>6.1 Service Availability</h3>
              <p>
                We strive to keep the Services operational at all times, but we do not guarantee that the Services will always be available, uninterrupted, or error-free.
              </p>

              <h3>6.2 Service Quality</h3>
              <p>
                The Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h3>6.3 Accuracy</h3>
              <p>
                While we strive for high accuracy in our data extraction and processing, we do not guarantee that the Services will be error-free. You are responsible for reviewing and verifying all results provided by the Services.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, InvoiceAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul>
                <li>Your use or inability to use the Services</li>
                <li>Any unauthorized access to or use of our servers or personal information</li>
                <li>Any interruption or cessation of the Services</li>
                <li>Any bugs, viruses, or other harmful code that may be transmitted through the Services</li>
                <li>Any content obtained from the Services</li>
              </ul>
              <p>
                In no event shall our total liability to you for all claims exceed the amount you paid to us for the Services during the 12 months preceding the event giving rise to the liability.
              </p>

              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless InvoiceAI and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul>
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your User Content</li>
              </ul>

              <h2>9. Term and Termination</h2>
              <h3>9.1 Term</h3>
              <p>
                These Terms will remain in effect until terminated by you or us.
              </p>

              <h3>9.2 Termination by You</h3>
              <p>
                You may terminate these Terms at any time by canceling your account and discontinuing use of the Services.
              </p>

              <h3>9.3 Termination by Us</h3>
              <p>
                We may terminate or suspend your access to the Services at any time, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>

              <h3>9.4 Effect of Termination</h3>
              <p>
                Upon termination:
              </p>
              <ul>
                <li>Your right to use the Services will immediately cease</li>
                <li>We may delete your account and User Content</li>
                <li>All provisions of these Terms which by their nature should survive termination shall survive termination</li>
              </ul>

              <h2>10. General Provisions</h2>
              <h3>10.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>

              <h3>10.2 Dispute Resolution</h3>
              <p>
                Any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association.
              </p>

              <h3>10.3 Class Action Waiver</h3>
              <p>
                You agree that any proceedings to resolve disputes will be conducted on an individual basis and not in a class, consolidated, or representative action.
              </p>

              <h3>10.4 Modifications to Terms</h3>
              <p>
                We may modify these Terms at any time by posting the revised Terms on our website. Your continued use of the Services after such changes constitutes your acceptance of the revised Terms.
              </p>

              <h3>10.5 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
              </p>

              <h3>10.6 No Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.
              </p>

              <h3>10.7 Assignment</h3>
              <p>
                You may not assign or transfer these Terms without our prior written consent. We may assign or transfer these Terms without your consent.
              </p>

              <h3>10.8 Entire Agreement</h3>
              <p>
                These Terms, together with the Privacy Policy, constitute the entire agreement between you and InvoiceAI regarding the Services and supersede all prior agreements and understandings.
              </p>

              <h2>11. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                InvoiceAI, Inc.<br />
                Attn: Legal Department<br />
                123 Tech Street, Suite 400<br />
                San Francisco, CA 94103<br />
                Email: legal@invoiceai.example.com
              </p>
            </motion.div>

            <div className="mt-12 space-y-8 border-t border-border pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="mr-4 mt-1">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Legal Compliance</h3>
                  <p className="text-muted-foreground">
                    We design our products and policies to comply with applicable laws and regulations while protecting our users' rights.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="mr-4 mt-1">
                  <GlobeLock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Protection</h3>
                  <p className="text-muted-foreground">
                    Our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/gdpr" className="text-primary hover:underline">GDPR Compliance</a> documentation provide additional information about how we protect your data.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="mr-4 mt-1">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Questions?</h3>
                  <p className="text-muted-foreground">
                    If you have any questions about our Terms of Service, please contact our legal team at <a href="mailto:legal@invoiceai.example.com" className="text-primary hover:underline">legal@invoiceai.example.com</a>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
