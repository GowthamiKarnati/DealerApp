
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const MainContent = ({ customerData }) => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
    
    useEffect(() => {
                const fetchData = async () => {
                    try {
                        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
                        const customerResponse = await axios.get(`https://backendforpnf.vercel.app/testloans?criteria=sheet_59283844.column_793%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        
                        const sortedData = customerResponse.data.data.sort((a, b) => {
                            return new Date(b['Last Status Updated At']) - new Date(a['Last Status Updated At']);
                        });
        
                        setCustomerInfo(sortedData[0]);
        
                        if (sortedData[0]?.PDF) {
                            const pdfData = JSON.parse(sortedData[0].PDF);
                            const pdfInfo = pdfData[0];
                            if (pdfInfo && pdfInfo.filepath) {
                                const pdfUrl = `https://pnf.tigersheet.com/user/file/download?filepath=${pdfInfo.filepath}&column_id=1209&row_id=${sortedData[0].record_id}&list_id=59283844`;
                                console.log("pdf", pdfUrl);
                                setPdfUrl(pdfUrl);
                            } else {
                                setError('Filepath not found in the PDF info.');
                            }
                        }
                    } catch (error) {
                        setError('Error fetching data:' + error.message);
                    } finally {
                        setLoading(false);
                    }
                };
        
                fetchData();
            }, [customerPhoneNumber]);
    const goToNextPage = () => {
        // Increment the current page number
        setCurrentPage(currentPage + 1);
    };
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container} >
            {pdfUrl && (
                        <Pdf
                        trustAllCerts={false}
                            source={{
                                uri: pdfUrl,
                                cache: true,
                            }}
                            scale={0.8} 
                            fitWidth={true}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={error => {
                                setError('Error loading PDF: ' + error);
                            }}
                            onPressLink={uri => {
                                console.log(`Link pressed: ${uri}`);
                            }}
                            style={styles.pdf}
                            fitPolicy={2}
                            // fitWidth={true}
                        />
                    )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
    },
    pdf: {
        flex:1,

        width: width,
        height:height
        //height: '100%',

    },
});
export default MainContent;
