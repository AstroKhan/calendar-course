import React, { FC, useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import {Layout, Row, Button, Modal} from 'antd';
import EventForm from '../components/EventForm';

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
  <Layout>
      <EventCalendar events={[]}/>
      <Row justify='center'>
          <Button 
          onClick={() => setModalVisible(true)}
          >
            Добавить событие
          </Button>
      </Row>
      <Modal 
      title='Добавить событие'
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
      >
        <EventForm/>
      </Modal>
  </Layout>
  );
};

export default Event;
