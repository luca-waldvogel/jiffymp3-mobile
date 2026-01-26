import { commonStyles } from '@/styles/common';
import { ScrollView, Text, View } from "react-native";

export default function Info() {
    return (
        <View style={commonStyles.infoContainer}>
            <View style={commonStyles.mainHeader}></View>
            <ScrollView contentContainerStyle={commonStyles.infoContent}>
                <Text style={commonStyles.infoTitle}>Terms of Use</Text>
                
                <Text style={commonStyles.infoText}>
                    These Terms govern your use of the JiffyMP3 app. By using our app, you agree to these terms. If you disagree with any part, please refrain from using our services.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>1. Acceptance of Terms</Text>
                <Text style={commonStyles.infoText}>
                    By accessing JiffyMP3, you agree to these Terms of Use and any applicable terms for specific features.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>2. User Responsibilities</Text>
                <Text style={commonStyles.infoText}>
                    You must have permission to upload, convert, and download any content on JiffyMP3.{'\n'}
                    Do not use JiffyMP3 for illegal activities. Follow all laws and regulations.{'\n'}
                    You are responsible for any content you upload or convert. JiffyMP3 does not endorse or verify user content.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>3. Prohibited Activities</Text>
                <Text style={commonStyles.infoText}>
                    Do not use JiffyMP3 to violate others' intellectual property rights.{'\n'}
                    Do not upload or share harmful or illegal content.{'\n'}
                    Do not attempt to access unauthorized parts of JiffyMP3.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>4. Intellectual Property</Text>
                <Text style={commonStyles.infoText}>
                    JiffyMP3 and its content (text, graphics, software) are protected by copyright. You may not use them without permission.{'\n'}
                    Uploaded content remains the property of its owners. By using JiffyMP3, you grant us a license to use the content as needed for our services.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>5. Limitation of Liability</Text>
                <Text style={commonStyles.infoText}>
                    JiffyMP3 is provided "as is." We do not guarantee uninterrupted or error-free service.{'\n'}
                    We are not liable for any damages arising from your use of JiffyMP3.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>6. Copyright</Text>
                <Text style={commonStyles.infoText}>
                    JiffyMP3 respects copyright. If you believe your rights are being infringed, please contact us with details and URLs of the content to be blocked.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>7. Changes to Terms</Text>
                <Text style={commonStyles.infoText}>
                    We may update these Terms at any time. Changes take effect when posted. Continued use of JiffyMP3 means acceptance of the updated Terms.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>8. Governing Law</Text>
                <Text style={commonStyles.infoText}>
                    These Terms are governed by the laws of Switzerland, and any disputes shall be subject to the exclusive jurisdiction of the courts of Switzerland.
                </Text>

                <Text style={commonStyles.infoSectionTitle}>9. Data Privacy</Text>
                <Text style={commonStyles.infoText}>
                    <Text style={{ fontWeight: '600' }}>No Data Storage:</Text> JiffyMP3 does not store any user data or content. All data processed through our services is used solely for the purpose of providing the requested conversion and is not saved on our servers.{'\n\n'}
                    <Text style={{ fontWeight: '600' }}>No Data Analysis:</Text> JiffyMP3 does not analyze, track, or profile any data or content uploaded by users. Once the conversion process is completed, all data is immediately deleted from our system.{'\n\n'}
                    <Text style={{ fontWeight: '600' }}>User Anonymity:</Text> We respect user privacy and ensure that all actions on our platform remain anonymous. No personal information is required or retained for using the conversion services.
                </Text>
            </ScrollView>
        </View>
    );
}
