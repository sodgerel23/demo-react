import {Button, Col, Flex, Form, Input, message, Modal, Row} from "antd"
import React, {useEffect, useState} from "react"
import {getService, postService} from "../utils/services";

export const Page1 = () => {

  const [personData, setPersonData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null)

  const getData = () => {
    getService("/main/getPersonData").then(response => {
      if (response.data) {
        setPersonData(response.data)
        setFormData(personData)
      }
    }).catch(error => message.warning(error?.response?.data?.message ?? error.message))
  }

  const showEditModal = () => {
    form.setFieldsValue({
      age: personData.age,
      firstName: personData.firstName,
      lastName: personData.lastName
    });
    setIsModalOpen(true);
  };

  const updatePersonData = (values) => {
    postService("/main/updateDataPost", values)
      .then(response => {
        void message.info('success');
      })
      .catch(error => void message.error(error?.response?.data?.message ?? error.message))
      .finally(() => setIsModalOpen(false))
  };

  const onValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };


  useEffect(() => {
    if (!personData) {
      getData()
    }
  }, []);

  return (
    <div>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <div>this is page 1</div>
        </Col>
        <Col span={24}>
          <div>Нас: {personData?.age}</div>
        </Col>
        <Col span={24}>
          <div>Овог: {personData?.lastName}</div>
        </Col>
        <Col span={24}>
          <div>Нэр: {personData?.firstName}</div>
        </Col>
        <Col span={24}>
          <Button type="dashed" onClick={() => getData()}>Мэдээлэл шинэчлэх</Button>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={() => showEditModal()}>Мэдээлэл засах</Button>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          form={form}
          onFinish={updatePersonData}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item label="Нас" name="age" rules={[{required: true, message: 'Нас оруулна уу!',},]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Овог" name="lastName" rules={[{required: true, message: 'Овог оруулна уу!',},]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Нэр" name="firstName" rules={[{required: true, message: 'Нэр оруулна уу!',},]}>
            <Input/>
          </Form.Item>

          <Flex justify="flex-end" gap="small">
            <Button onClick={() => setIsModalOpen(false)}>Хаах</Button>
            <Button type="primary" htmlType="submit">Хадгалах</Button>
          </Flex>
        </Form>
      </Modal>
    </div>
  )
}