
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Clock, GlobeLock, Users, FileText, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "April 1, 2024";

  return (
    <>
      <Helmet>
        <title>Privacy Policy | InvoiceAI - How We Protect Your Data</title>
        <meta name="description" content="Learn about InvoiceAI's privacy practices and how we collect, use, and protect your personal information." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, personal information, data security" />
        <meta property="og:title" content="Privacy Policy | InvoiceAI" />
        <meta property="og:description" content="Learn about InvoiceAI's privacy practices and how we collect, use, and protect your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/privacy" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/privacy" />
      </Helmet>

      <div className="pb-16">
        <PageHeader
          pageName="Privacy Policy"
          title="Our Privacy Commitment"
          description="We take your privacy seriously. Learn how we collect, use, and protect your information."
          backgroundClass="bg-primary/5"
        />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Privacy Policy</h2>
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
                InvoiceAI, Inc. ("InvoiceAI," "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our invoice processing platform and related services (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree, please do not access or use our Services.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect the following types of information:</p>

              <h3>Personal Information</h3>
              <p>Personal information is information that identifies you or could reasonably be used to identify you. We may collect the following personal information:</p>
              <ul>
                <li>Contact information (name, email address, phone number, postal address)</li>
                <li>Account credentials (username, password)</li>
                <li>Billing information (credit card details, billing address)</li>
                <li>Employment information (job title, company name)</li>
                <li>User content (such as messages, feedback, or other content you submit)</li>
              </ul>

              <h3>Business Data</h3>
              <p>When using our Services, you may upload documents such as invoices, purchase orders, or other financial documents. These documents may contain:</p>
              <ul>
                <li>Vendor/customer information (names, addresses, contact details)</li>
                <li>Financial information (amounts, payment terms, bank details)</li>
                <li>Transaction details (products/services purchased, dates, reference numbers)</li>
              </ul>

              <h3>Usage Data</h3>
              <p>We automatically collect certain information about how you interact with our Services, including:</p>
              <ul>
                <li>Device information (browser type, operating system, IP address)</li>
                <li>Usage patterns (pages visited, time spent, clicks, features used)</li>
                <li>Log data (error reports, activity logs, timestamps)</li>
                <li>Performance data (load times, system activity, crashes)</li>
              </ul>

              <h2>How We Collect Information</h2>
              <p>We collect information through:</p>
              <ul>
                <li>Direct interactions (when you create an account, upload documents, or contact us)</li>
                <li>Automated technologies (cookies, web beacons, analytics tools)</li>
                <li>Third-party sources (integration partners, service providers, publicly available sources)</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>

              <h3>Providing and Improving Our Services</h3>
              <ul>
                <li>To process invoices and other documents you submit</li>
                <li>To maintain and operate your account</li>
                <li>To improve our Services and develop new features</li>
                <li>To provide customer support and respond to inquiries</li>
              </ul>

              <h3>Business Operations</h3>
              <ul>
                <li>To process payments and manage billing</li>
                <li>To send administrative notifications</li>
                <li>To analyze usage patterns and trends</li>
                <li>To measure the effectiveness of our Services</li>
              </ul>

              <h3>Marketing and Communication</h3>
              <ul>
                <li>To send relevant marketing communications (if you have opted in)</li>
                <li>To inform you about new features or services</li>
                <li>To conduct surveys and collect feedback</li>
              </ul>

              <h3>Legal and Security</h3>
              <ul>
                <li>To comply with legal obligations</li>
                <li>To enforce our Terms of Service</li>
                <li>To detect and prevent fraud or security incidents</li>
                <li>To protect our rights, property, or safety</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <p>We may share your information with:</p>

              <h3>Service Providers</h3>
              <p>We share information with third-party service providers who help us operate our business and deliver our Services, such as:</p>
              <ul>
                <li>Cloud hosting providers</li>
                <li>Payment processors</li>
                <li>Analytics providers</li>
                <li>Customer support tools</li>
              </ul>

              <h3>Business Partners</h3>
              <p>We may share information with business partners who help us provide, improve, or promote our Services. These partners are bound by confidentiality obligations and are restricted from using the information for any purpose other than as authorized.</p>

              <h3>Legal Requirements</h3>
              <p>We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas, or government requests).</p>

              <h3>Business Transfers</h3>
              <p>If we are involved in a merger, acquisition, financing, or sale of business assets, your information may be transferred as part of that transaction.</p>

              <h3>With Your Consent</h3>
              <p>We may share your information with third parties when you have given us your consent to do so.</p>

              <h2>Data Security</h2>
              <p>We implement and maintain reasonable security measures designed to protect your information from unauthorized access, destruction, use, modification, or disclosure. These measures include:</p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security assessments and audits</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p>However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>

              <h2>Data Retention</h2>
              <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the appropriate retention period, we consider:</p>
              <ul>
                <li>The amount, nature, and sensitivity of the information</li>
                <li>The potential risk of harm from unauthorized use or disclosure</li>
                <li>The purposes for which we process the information</li>
                <li>Applicable legal requirements</li>
              </ul>

              <h2>Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>

              <h3>Access and Portability</h3>
              <p>You may request access to your personal information and obtain a copy of the information we hold about you in a structured, machine-readable format.</p>

              <h3>Correction</h3>
              <p>You may request that we correct inaccurate or incomplete information about you.</p>

              <h3>Deletion</h3>
              <p>You may request that we delete your personal information in certain circumstances, subject to legal retention requirements.</p>

              <h3>Restriction and Objection</h3>
              <p>You may request that we restrict or stop processing your information for certain purposes.</p>

              <h3>Consent Withdrawal</h3>
              <p>Where we rely on your consent to process your information, you may withdraw that consent at any time.</p>

              <h3>Marketing Preferences</h3>
              <p>You can opt out of marketing communications by following the unsubscribe instructions included in our emails or by contacting us directly.</p>

              <p>To exercise any of these rights, please contact us using the information provided at the end of this Policy.</p>

              <h2>Children's Privacy</h2>
              <p>Our Services are not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information without parental consent, please contact us, and we will take steps to remove such information.</p>

              <h2>International Data Transfers</h2>
              <p>We may transfer, process, and store your information in countries other than your own. These countries may have data protection laws that are different from those in your country. When we transfer information across borders, we take steps to ensure that it receives an adequate level of protection, including:</p>
              <ul>
                <li>Using standard contractual clauses approved by relevant authorities</li>
                <li>Ensuring transfers comply with applicable data protection laws</li>
                <li>Implementing additional safeguards as necessary</li>
              </ul>

              <h2>Updates to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this Privacy Policy and notify you through the Services or by other means as required by law.</p>

              <h2>Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
              <p>
                InvoiceAI, Inc.<br />
                Attn: Privacy Team<br />
                123 Tech Street, Suite 400<br />
                San Francisco, CA 94103<br />
                Email: privacy@invoiceai.example.com
              </p>

              <p>We will respond to your request within a reasonable timeframe and in accordance with applicable data protection laws.</p>
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
                  <GlobeLock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Protection</h3>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.
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
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Data Rights</h3>
                  <p className="text-muted-foreground">
                    We respect your rights to access, correct, delete, or restrict the use of your personal information as required by applicable law.
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
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Resources</h3>
                  <p className="text-muted-foreground">
                    For more information about our privacy practices, please see our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/gdpr" className="text-primary hover:underline">GDPR Compliance</a> documentation.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="mr-4 mt-1">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact our Data Protection Officer at <a href="mailto:privacy@invoiceai.example.com" className="text-primary hover:underline">privacy@invoiceai.example.com</a>.
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

export default PrivacyPolicy;
