import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHistoryMine } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function Transaction(props) {
  const userHistory = useSelector((state) => state.userHistory);
  const { loading, error, histories } = userHistory;

  console.log(histories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listHistoryMine());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container mt-5">
          <h2 className="">Transaction</h2>
          {histories.length > 0 ? (
            <table className="table table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Phone Number</th>
                  <th>Product Name</th>
                  <th>Serial Number</th>
                  <th>Pin Code</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history) => (
                  <tr>
                    <td>1</td>
                    <td>0{history.user.phone}</td>
                    <td>{history.usedSerial_Prouct_Name}</td>
                    <td>{history.usedSerial}</td>
                    <td>{history.code}</td>
                    <td>{history.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="center">Transaction Empty</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Transaction;
