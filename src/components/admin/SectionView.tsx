import React from 'react'
import { Row, Col, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

function SectionView() {
    return (
        <div>
            <Row justify="end">
                <Col>
                    <Button >
                        <ArrowLeftOutlined />
                    </Button>
                </Col>
            </Row>
            <Row>

                <span>view componnet</span>
            </Row>
        </div>
    )
}

export default SectionView;
