import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {useSelector, useDispatch} from 'react-redux';
import {selectSearchValue} from '../../redux/slices/authSlice';
import {selectApplicationData} from '../../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';

const Applications = () => {
  const {t} = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiData = useSelector(selectApplicationData);
  const searchValue = useSelector(selectSearchValue);
  const [refreshing, setRefreshing] = useState(false);
  console.log('Applications', apiData);

  useEffect(() => {
    fetchData();
  }, [apiData, searchValue]);

  const fetchData = async () => {
    try {
      const filteredData = apiData.filter(
        item =>
          item['Full Name'].toLowerCase().includes(searchValue.toLowerCase()) ||
          item['Workflow Status']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.record_id.includes(searchValue),
      );
      const capitalizeFirstLetter = str => {
        if (!str) return '';

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
      const formattedData = filteredData.map(item => ({
        id: item.record_id,
        date: item.Date,
        fullName: capitalizeFirstLetter(item['Full Name'].toLowerCase()),
        amount: parseFloat(item['Loan amount requested']),
        sanctionedAmount: parseFloat(item['amount sanctioned']),
        status: item['Workflow Status'].toLowerCase().trim(),
      }));

      const sortedData = formattedData.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      ); // Sort by date, latest on top

      setTableData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const getStatusColor = status => {
    switch (status) {
      case 'loan account created':
        return 'orange';
      case 'escalate':
        return 'purple';
      case 'requested':
        return 'yellow';
      case 'rejected':
        return 'red';
      case 'expired':
        return 'blue';
      case 'sanctioned':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* <Text>{searchValue}</Text> */}
      {loading ? ( // Show ActivityIndicator while loading is true
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <View>
          {tableData.length > 0 ? (
            <Table borderStyle={{borderWidth: 1, borderColor: '#e5e7eb'}}>
              <Row
                data={[
                  t('id'),
                  t('date'),
                  t('name'),
                  t('amount'),
                  t('sanctinedamount'),
                  t('status'),
                ]}
                style={styles.header}
                textStyle={styles.headerText}
              />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    <Text style={{paddingHorizontal: 10, paddingVertical: 20, color:'black'}}>
                      {rowData.id}
                    </Text>,
                    <Text style={{paddingHorizontal: 10, paddingVertical: 0,color:'black'}}>
                      {rowData.date.split(' ')[0]}
                    </Text>,
                    <Text style={{fontSize: 13, paddingHorizontal: 5,color:'black'}}>
                      {rowData.fullName}
                    </Text>,
                    <Text style={{paddingHorizontal: 10, paddingVertical: 22,color:'black'}}>
                      {'₹' + rowData.amount.toString()}
                    </Text>,
                    <Text style={{paddingHorizontal: 10, paddingVertical: 22,color:'black'}}>
                      {'₹' + rowData.sanctionedAmount.toString()}
                    </Text>,
                    <Text
                      style={{
                        color: getStatusColor(rowData.status),
                        paddingHorizontal: 7,
                        fontSize: 13,
                      }}>
                      {t(`statusLabels.${rowData.status}`)}
                    </Text>,
                  ]}
                  textStyle={styles.cell}
                />
              ))}
            </Table>
          ) : (
            <Text style={styles.noDataText}>{t('noApplications')}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#e5e7eb',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color:'black'
  },
  cell: {
    height: 70,
    textAlign: 'center',
    borderColor: '#e5e7eb',
    paddingTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 8,
    marginBottom: 10,
  },
});

export default Applications;
