import React, { useEffect, useState } from 'react';
import "./Blog.scss";
import { Url } from '../../Constants/ApiUrlConstants';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import useApi from '../../Custom/useApi';
import { Spin, Modal, Form, Input, Upload, DatePicker, TimePicker, Checkbox, Button, Row, Col, message, Select } from 'antd';
import { PlusOutlined, UploadOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import RecentBlogs from './RecentBlogs/RecentBlogs';
import NotFound from '../../Assets/NotFound.jpg'

const { TextArea } = Input;

const Blogs = () => {
  const { request, loading } = useApi();
  const [blogData, setBlogdata] = useState();
  const [lastItem, setLastItem] = useState(null);
  const [addBlogPopup, setAddBlogPopup] = useState(false);
  const [publishedDate, setPublishedDate] = useState('');
  const [publishedTime, setPublishedTime] = useState('');
  const [form] = Form.useForm();

  const history = useHistory();

  const generateBlogId = (category) => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${category}-${randomNumber}`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const responseData = await request(Url.getAllBlogs, "GET");
      if (responseData.success && responseData.data.length > 0) {
        setBlogdata(responseData.data);
        setLastItem(responseData.data[responseData.data.length - 1]);
      }
    };
    fetchBlogs();
  }, []);

  const showDetails = (item) => {
    history.push({
      pathname: '/main/ViewBlog',
      state: { data: item }
    });
    sessionStorage.setItem('BlogId', item?._id);
  };

  const handleAddBlog = async (values) => {
    const isoDate = publishedDate && publishedTime
      ? new Date(`${publishedDate}T${publishedTime}`).toISOString()
      : '';
    console.log(values)
    const blogDetails = {
      
      ...values,
      blogId: generateBlogId(values.category), 
      blogImage: values.blogImage || { data: '', contentType: '', filename: '' }
    };
    const res = await request(Url.addBlogs, "POST", blogDetails);
    if (res.success) {
      message.success("Blog added successfully");
      setAddBlogPopup(false);
      form.resetFields();
    } else {
      message.error("Failed to add blog");
    }
  };

  const handleImageUpload = async ({ file }) => {
    if (!file) return;

    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64Image = await convertFileToBase64(file);
      form.setFieldsValue({
        blogImage: {
          filename: file.name,
          contentType: file.type,
          data: base64Image
        }
      });
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      message.error('Error converting image');
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" tip="Loading Blogs..." fullscreen />
        </div>
      ) : (
        <>
          <div className="blogs__add">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddBlogPopup(true)}>
              Add Blog
            </Button>
          </div>

          <div className="blogs__header">
            <div className="blogs__header-container">
              <div className="blogs__heading">
                <span className="blogs__category">{lastItem?.category}</span>
                <img className="blogs__header-img" src={lastItem?.blogImage?.data || NotFound} alt="" />
                <div className="blogs__heading-content">
                  <h1>{lastItem?.title}</h1>
                  <p>{lastItem?.content}</p>
                  <Button type="link" onClick={() => showDetails(lastItem)}>Read Article</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="blogs__wrapper">
            <div className="blogs__recent">
              <RecentBlogs blogs={blogData?.filter(item => item._id !== lastItem._id)} onClick={showDetails} />
            </div>

            <div className="blogs__side-list">
              {blogData?.map((item, i) => {
                if (item._id !== lastItem._id && i >= 2 && i <= 4) {
                  return (
                    <div className="blogs__list-item" key={item._id}>
                      <h5>{item.title}</h5>
                      <p>{item.content}</p>
                      <span className="blogs__list-readmore">Read More</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <Modal
            title="Add New Blog"
            open={addBlogPopup}
            onCancel={() => setAddBlogPopup(false)}
            footer={null}
            width={700}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddBlog}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Blog Title" name="title" rules={[{ required: true, message: 'Please enter blog title' }]}>
                    <Input placeholder="Enter blog title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please enter author name' }]}>
                    <Input placeholder="Enter author name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Blog Image" name="blogImage">
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      onChange={({ file }) => handleImageUpload({ file })}
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Blog Video" name="blogVideo">
                    <Upload
                      beforeUpload={() => false} // prevent auto upload
                      maxCount={1}
                      accept="video/*"
                      onChange={async ({ file }) => {
                        if (!file) return;

                        const convertFileToBase64 = (file) => {
                          return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                          });
                        };

                        try {
                          const base64Video = await convertFileToBase64(file);
                          form.setFieldsValue({
                            blogVideo: {
                              filename: file.name,
                              contentType: file.type,
                              data: base64Video
                            }
                          });
                          message.success(`${file.name} uploaded successfully`);
                        } catch (error) {
                          message.error('Error converting video');
                        }
                      }}
                    >
                      <Button icon={<VideoCameraAddOutlined />}>Upload Video</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Published Date">
                    <DatePicker
                      style={{ width: '100%' }}
                      onChange={(date, dateString) => setPublishedDate(dateString)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Published Time">
                    <TimePicker
                      style={{ width: '100%' }}
                      onChange={(time, timeString) => setPublishedTime(timeString)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please enter blog content' }]}>
                <TextArea rows={4} placeholder="Write your blog content..." />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tags" name="tags">
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Add or select tags"
                      tokenSeparators={[',']}
                      options={[
                        { value: 'Technology', label: 'Technology' },
                        { value: 'Lifestyle', label: 'Lifestyle' },
                        { value: 'Travel', label: 'Travel' },
                        { value: 'Food', label: 'Food' },
                        { value: 'Business', label: 'Business' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please enter category' }]}>
                    <Input placeholder="Enter category" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="published" valuePropName="checked" initialValue={true}>
                <Checkbox>Published</Checkbox>
              </Form.Item>

              <div style={{ textAlign: 'right' }}>
                <Button onClick={() => setAddBlogPopup(false)} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

export default Blogs;
