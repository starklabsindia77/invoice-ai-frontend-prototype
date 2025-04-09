
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, GlobeLock, FileLock, Clock, Users, FileCheck, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PageHeader from '@/components/PageHeader';

const GdprCompliance: React.FC = () => {
  const lastUpdated = "April 1, 2024";

  return (
    <>
      <Helmet>
        <title>GDPR Compliance | InvoiceAI - Data Protection & Privacy</title>
        <meta name="description" content="Learn about InvoiceAI's GDPR compliance measures and how we protect your data in accordance with European data protection regulations." />
        <meta name="keywords" content="GDPR, data protection, privacy, compliance, EU regulations, personal data" />
        <meta property="og:title" content="GDPR Compliance | InvoiceAI" />
        <meta property="og:description" content="Learn about InvoiceAI's GDPR compliance measures and how we protect your data in accordance with European data protection regulations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/gdpr" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/gdpr" />
      </Helmet>

      <div className="pb-16">
        <PageHeader
          pageName="GDPR Compliance"
          title="Our Commitment to Data Protection"
          description="Learn how we comply with the EU General Data Protection Regulation (GDPR) and protect your personal data."
          backgroundClass="bg-primary/5"
        />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center">
                <GlobeLock className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold">GDPR Compliance</h2>
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
            >
              <div className="prose prose-gray max-w-none mb-12">
                <h2>Introduction to GDPR Compliance</h2>
                <p>
                  At InvoiceAI, we take data protection and privacy seriously. We are committed to complying with the General Data Protection Regulation (GDPR), which enhances the protection of personal data for individuals within the European Union (EU) and European Economic Area (EEA).
                </p>
                <p>
                  This GDPR Compliance Statement explains how we collect, process, and protect personal data in accordance with GDPR requirements. It should be read alongside our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                </p>

                <h2>Our Role as Data Controller and Data Processor</h2>
                <p>
                  Under the GDPR, InvoiceAI acts as both a data controller and a data processor:
                </p>
                <ul>
                  <li><strong>Data Controller:</strong> We are a data controller for the personal data we collect about our users, customers, and website visitors for our own business purposes.</li>
                  <li><strong>Data Processor:</strong> We are a data processor for the personal data that our customers upload to our platform (such as invoice data) for processing.</li>
                </ul>

                <h2>Data Protection Principles</h2>
                <p>
                  We adhere to the following principles when processing personal data:
                </p>
                <ul>
                  <li><strong>Lawfulness, fairness, and transparency:</strong> We process data lawfully, fairly, and transparently.</li>
                  <li><strong>Purpose limitation:</strong> We collect data for specified, explicit, and legitimate purposes and do not process it in a manner incompatible with those purposes.</li>
                  <li><strong>Data minimization:</strong> We collect only the data that is necessary for the purposes for which it is processed.</li>
                  <li><strong>Accuracy:</strong> We keep personal data accurate and up to date.</li>
                  <li><strong>Storage limitation:</strong> We store data only as long as necessary for the purposes for which it is processed.</li>
                  <li><strong>Integrity and confidentiality:</strong> We process data securely, protecting it against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</li>
                  <li><strong>Accountability:</strong> We are responsible for and can demonstrate compliance with the GDPR.</li>
                </ul>
              </div>

              <Accordion type="single" collapsible className="w-full mb-12">
                <AccordionItem value="lawful-basis">
                  <AccordionTrigger>Lawful Basis for Processing</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      Under the GDPR, we must have a valid lawful basis for processing personal data. Depending on the specific context, we rely on the following lawful bases:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.</li>
                      <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate interests or the legitimate interests of a third party, provided those interests are not overridden by your rights and freedoms.</li>
                      <li><strong>Legal obligation:</strong> Processing is necessary to comply with a legal obligation.</li>
                      <li><strong>Consent:</strong> You have given consent to the processing of your personal data for one or more specific purposes.</li>
                    </ul>
                    <p className="mt-4">
                      We identify the lawful basis for processing in our Privacy Policy for each category of personal data we collect.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-subject-rights">
                  <AccordionTrigger>Data Subject Rights</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      The GDPR provides individuals (data subjects) with certain rights regarding their personal data. We respect these rights and have implemented processes to facilitate their exercise:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Right to be informed:</strong> You have the right to know how we collect and use your personal data.</li>
                      <li><strong>Right of access:</strong> You have the right to obtain confirmation that your data is being processed and to access your personal data.</li>
                      <li><strong>Right to rectification:</strong> You have the right to have inaccurate personal data rectified or completed if it is incomplete.</li>
                      <li><strong>Right to erasure (right to be forgotten):</strong> You have the right to request the deletion of your personal data in certain circumstances.</li>
                      <li><strong>Right to restrict processing:</strong> You have the right to request the restriction of processing of your personal data in certain circumstances.</li>
                      <li><strong>Right to data portability:</strong> You have the right to obtain and reuse your personal data for your own purposes across different services.</li>
                      <li><strong>Right to object:</strong> You have the right to object to the processing of your personal data in certain circumstances.</li>
                      <li><strong>Rights related to automated decision-making and profiling:</strong> You have rights related to automated decision-making and profiling.</li>
                    </ul>
                    <p className="mt-4">
                      To exercise any of these rights, please contact our Data Protection Officer using the contact information provided at the end of this document.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-protection-measures">
                  <AccordionTrigger>Data Protection Measures</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Encryption:</strong> We use encryption for data in transit and at rest.</li>
                      <li><strong>Access controls:</strong> We implement strict access controls and authentication mechanisms.</li>
                      <li><strong>Regular security assessments:</strong> We conduct regular security assessments and audits.</li>
                      <li><strong>Data backup procedures:</strong> We maintain backup procedures to prevent accidental loss or destruction of data.</li>
                      <li><strong>Staff training:</strong> We provide training for staff on data protection practices.</li>
                      <li><strong>Data protection impact assessments:</strong> We conduct data protection impact assessments when necessary.</li>
                      <li><strong>Privacy by design and default:</strong> We consider data protection issues from the design phase of new products and services.</li>
                      <li><strong>Incident response procedures:</strong> We have procedures in place to detect, report, and investigate personal data breaches.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="international-transfers">
                  <AccordionTrigger>International Data Transfers</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      As a global company, we may transfer personal data to countries outside the EU/EEA. When we do, we ensure appropriate safeguards are in place to protect the data:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li><strong>Standard Contractual Clauses (SCCs):</strong> We use EU-approved standard contractual clauses in our agreements with third parties who process data outside the EU/EEA.</li>
                      <li><strong>Adequacy decisions:</strong> We transfer data to countries that the European Commission has determined provide adequate protection.</li>
                      <li><strong>Additional safeguards:</strong> Where necessary, we implement additional measures to ensure that the data is adequately protected.</li>
                    </ul>
                    <p className="mt-4">
                      For more information about our international data transfers, please contact our Data Protection Officer.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-breach-notification">
                  <AccordionTrigger>Data Breach Notification</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      In the event of a personal data breach, we have procedures in place to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Detect and assess the breach</li>
                      <li>Determine if it is notifiable</li>
                      <li>Notify the relevant supervisory authority within 72 hours, if required</li>
                      <li>Notify affected individuals without undue delay, if required</li>
                      <li>Document the breach and our response</li>
                    </ul>
                    <p className="mt-4">
                      Our data breach response plan is regularly tested and updated to ensure it remains effective.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-protection-officer">
                  <AccordionTrigger>Data Protection Officer</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      We have appointed a Data Protection Officer (DPO) who is responsible for:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Informing and advising us about our data protection obligations</li>
                      <li>Monitoring compliance with the GDPR and other data protection laws</li>
                      <li>Providing advice on data protection impact assessments</li>
                      <li>Cooperating with supervisory authorities</li>
                      <li>Acting as a contact point for data subjects on privacy matters</li>
                    </ul>
                    <p className="mt-4">
                      Our DPO can be contacted at dpo@invoiceai.example.com.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-processing-agreements">
                  <AccordionTrigger>Data Processing Agreements</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      When we act as a data processor for our customers, we enter into data processing agreements (DPAs) that set out:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>The subject matter and duration of the processing</li>
                      <li>The nature and purpose of the processing</li>
                      <li>The type of personal data and categories of data subjects</li>
                      <li>The obligations and rights of the data controller</li>
                      <li>Our obligations as a data processor, including:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Processing only on documented instructions</li>
                          <li>Ensuring confidentiality</li>
                          <li>Implementing appropriate security measures</li>
                          <li>Assisting with data subject rights requests</li>
                          <li>Notifying of data breaches</li>
                          <li>Deleting or returning data at the end of the service</li>
                          <li>Providing information to demonstrate compliance</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="mt-4">
                      If you are a customer who requires a DPA, please contact our legal team at legal@invoiceai.example.com.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="training">
                  <AccordionTrigger>Employee Awareness and Training</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">
                      We ensure that our employees understand their responsibilities regarding data protection:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>All employees receive data protection training as part of their onboarding</li>
                      <li>Regular refresher training is provided on data protection principles</li>
                      <li>Specialized training is provided for staff with specific data protection responsibilities</li>
                      <li>Data protection policies and procedures are accessible to all staff</li>
                      <li>Clear guidelines are provided on handling personal data securely</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="prose prose-gray max-w-none mb-12">
                <h2>Our Compliance Roadmap</h2>
                <p>
                  We continuously review and improve our data protection practices. Our ongoing GDPR compliance efforts include:
                </p>
                <ul>
                  <li>Regular reviews of our policies and procedures</li>
                  <li>Continuous staff training and awareness</li>
                  <li>Regular data protection impact assessments for new initiatives</li>
                  <li>Keeping records of our processing activities</li>
                  <li>Monitoring regulatory guidance and case law</li>
                  <li>Audit and assessment of third-party processors</li>
                </ul>

                <h2>Contact Information</h2>
                <p>
                  If you have any questions about our GDPR compliance or wish to exercise your rights under the GDPR, please contact our Data Protection Officer:
                </p>
                <p>
                  Data Protection Officer<br />
                  InvoiceAI, Inc.<br />
                  123 Tech Street, Suite 400<br />
                  San Francisco, CA 94103<br />
                  Email: dpo@invoiceai.example.com
                </p>
                <p>
                  If you are in the EU and have concerns about our data processing activities, you also have the right to lodge a complaint with your local data protection authority.
                </p>
              </div>

              <div className="space-y-8 border-t border-border pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="mr-4 mt-1">
                    <FileLock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Data Protection by Design</h3>
                    <p className="text-muted-foreground">
                      We build privacy and security into our products from the ground up, not as an afterthought.
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
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Transparency and Control</h3>
                    <p className="text-muted-foreground">
                      We are committed to transparency about our data practices and providing you with meaningful control over your information.
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
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Additional Resources</h3>
                    <p className="text-muted-foreground">
                      For more information about our data protection practices, please see our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
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
                      If you have any questions about our GDPR compliance, please contact our Data Protection Officer at <a href="mailto:dpo@invoiceai.example.com" className="text-primary hover:underline">dpo@invoiceai.example.com</a>.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GdprCompliance;
