import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './Faqs.scss';

const Faqs = ({ courseVariantBatchesfaq }) => {
  const [faqsList, setFaqsList] = useState([]);
  const [key, setKey] = useState('About Techfit Program');

  const categoriseFaqs = async () => {
    const list = {};
    courseVariantBatchesfaq.forEach((element) => {
      const category = element.category;
      if (!list[category]) {
        list[category] = [];
      }
      list[category].push(element);
    });
    setFaqsList(Object.entries(list));
  };

  useEffect(() => {
    categoriseFaqs();
    
  }, [courseVariantBatchesfaq]);
  
  useEffect(() => {
    if (faqsList.length > 0) {
      setKey(faqsList[0][0]);
    }
  }, [faqsList]);

  return (
    <>
      <Tabs
        id="controlled-tab-faqs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="faqs-list">
        {faqsList.length > 0 &&
          faqsList.map((e) => {
            return (
              <Tab eventKey={e[0]} key={e[0]} title={e[0]} >
                <Accordion defaultActiveKey={0} alwaysOpen>
                  {e[1].map((accItem, idx) => (
                    <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header>{accItem.questions}</Accordion.Header>
                      <Accordion.Body>{accItem.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab>
            );
          })}
      </Tabs>
    </>
  );
};

export default Faqs;
