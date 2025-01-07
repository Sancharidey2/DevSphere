package com.debajyoti.service;


import com.debajyoti.entity.Account;

import java.util.List;

public interface AccountService {
    List<Account> findAll();
    Account findById(int id);
    Account save(Account account);
    void delete(int id);


}
