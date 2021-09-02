import React from "React";
import { useState } from 'react';
import Layout from "../../../../components/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import web3 from "../../../../ethereum/web3";
import campaign from "../../../../ethereum/campaign";
import styles from "./newRequest.module.css";


const NewRequest = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [msgType, setMsgType] = useState('alert-light');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    setMessage('Wait some seconds wile we process the request...');
    setMsgType('alert-warning');
    setShowMessage(true);
    setBtnDisabled(true);

    try{
        const accounts = await web3.eth.getAccounts();
        
        await campaign(id).methods.createRequest(
            data.description,
            web3.utils.toWei(data.value, 'ether'),
            data.recipient
        ).send({
            from: accounts[0],
          });

        setMessage('Request created successfully');
        setMsgType('alert-success');        
        setBtnDisabled(false);
        
    } catch(e){
        setMessage(`Error: ${e.message}`);
        setMsgType('alert-danger');      
        setBtnDisabled(false);
    }


  };

  return (
    <Layout>
      <div className={`container ${styles.container}`}>
        <div class={styles.back}>
            <button className="btn btn-light" onClick={() => router.push(`/campaigns/${id}`)}><i class="bi bi-arrow-left"></i>  Voltar</button>
        </div>
        <form className="form row" onSubmit={handleSubmit(onSubmit)}>
            
            {showMessage ? <div className={`alert ${msgType}`}>
                {message}
            </div> : ''}

          <h3>Create a new request</h3>
          <p>
            To create a new request you need to define the minimum value for the
            campaign
          </p>

          <div className="form-group">
            <label for="">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="form-control"
              placeholder="Description"
            />
            {errors.description && (
              <span className={styles.msgError}>* This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label for="">Value (Ether)</label>
            <input
              required
              type="text"
              {...register("value", { required: true })}
              required
              className="form-control"
              placeholder="Minimum value in Wei"
            />
            {errors.value && (
              <span className={styles.msgError}>* This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label for="">Recipient</label>
            <input
              type="text"
              {...register("recipient", { required: true })}
              required
              className="form-control"
              placeholder="0x00...."
            />
            {errors.recipient && (
              <span className={styles.msgError}>* This field is required</span>
            )}
          </div>
          <div className="d-grid col-12 mx-auto">
            <button disabled={btnDisabled} className="btn btn btn-info" type="submit">
              Create new request
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewRequest;
