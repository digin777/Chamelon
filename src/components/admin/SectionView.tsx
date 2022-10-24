import React from 'react'
import { Row, Col, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { dataOut, datasub } from '../../Validators/ConfigValidatorAjv'
function SectionView() {
    type InnerType = Array<JSX.Element>;
    let innerArray: InnerType = [];
    let outer: InnerType[] = [];
    datasub.map((item, idx) => {
        innerArray.push(
            <Col span={12} style={{alignItems:'center'}}>
                <Space direction="vertical" size="small">
                    <span style={{ fontWeight: 'bold' }}>{item.field}</span>
                    <span>{item.value}</span>
                </Space>
            </Col>);
        if (innerArray.length === 2) {
            outer.push(innerArray);
            innerArray = [];
        }
    })
    return (
        <div style={{minHeight:'525px'}}>
            <Row justify="end">
                <Col>
                    <Button >
                        <ArrowLeftOutlined />
                    </Button>
                </Col>
            </Row>
            {outer.map((item) => {
                return (<Row style={{marginTop:'10px'}}>{item}</Row>);
            })}
        </div>
    )
}

export default SectionView;
