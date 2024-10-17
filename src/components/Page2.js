import {Button, Col, message, Row} from "antd"
import React, {useState} from "react"
import {getService} from "../utils/services";

export const Page2 = () => {

  const [personData, setPersonData] = useState(null);

  const getData = () => {
    getService("/main/getPersonData").then(response => {
      if (response.data)
        setPersonData(response.data)
    }).catch(error => message.warning(error?.response?.data?.message ?? error.message))
  }

  return (
    <div>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <div>this is page 2</div>
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
      </Row>
    </div>
  )
}