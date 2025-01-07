package com.debajyoti.controller;

import com.debajyoti.entity.Account;
import com.debajyoti.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/accounts")
    public String getAllAccounts(Model model) {
        List<Account> list = accountService.findAll();
        model.addAttribute("accounts", list);
        return "list-accounts";
    }

    @GetMapping("/form-account")
    public String showFormForAdd(Model model) {
        Account theAccount = new Account();
        model.addAttribute("account", theAccount);
        return "form-account";
    }

    @PostMapping("/save")
    public String saveAccount(@ModelAttribute("account") Account account) {
        accountService.save(account);
        return "redirect:/api/accounts";
    }

    @GetMapping("/update-account")
    public String showFormForUpdate(@RequestParam("accountId") int id, Model model) {
        Account theAccount = accountService.findById(id);
        model.addAttribute("account", theAccount);
        return "form-account";
    }

    @GetMapping("/delete-account")
    public String deleteAccount(@RequestParam("accountId") int id) {
        accountService.delete(id);
        return "redirect:/api/accounts";
    }
}
